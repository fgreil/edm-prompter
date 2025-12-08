# Flask Time API Setup Guide

## Step 1: Install Dependencies

```bash
sudo apt update
sudo apt install python3-pip python3-venv nginx supervisor
```

## Step 2: Create Project

```bash
mkdir -p /var/www/timeapi
cd /var/www/timeapi
python3 -m venv venv
source venv/bin/activate
pip install flask gunicorn
```

## Step 3: Create Flask App

Create `/var/www/timeapi/app.py`:

```python
from flask import Flask, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/time')
def get_time():
    now = datetime.utcnow()
    
    return jsonify({
        "timestamp": now.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "date": {
            "year": now.year,
            "month": now.month,
            "day": now.day,
            "weekday": now.strftime("%A")
        },
        "time": {
            "hour": now.hour,
            "minute": now.minute,
            "second": now.second,
            "timezone": "UTC",
            "offset": "Z"
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

## Step 4: Configure Supervisor

Create `/etc/supervisor/conf.d/timeapi.conf`:

```ini
[program:timeapi]
directory=/var/www/timeapi
command=/var/www/timeapi/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:5000 app:app
user=www-data
autostart=true
autorestart=true
stderr_logfile=/var/log/timeapi.err.log
stdout_logfile=/var/log/timeapi.out.log
```

## Step 5: Configure Nginx

Create `/etc/nginx/sites-available/timeapi`:

```nginx
server {
    listen 80;
    server_name xx.xkcd.eu;

    location /time {
        proxy_pass http://127.0.0.1:5000/time;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Step 6: Enable and Start

```bash
# Enable Nginx site
sudo ln -s /etc/nginx/sites-available/timeapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Start with Supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start timeapi

# Check status
sudo supervisorctl status timeapi
```

## Step 7: Test

```bash
curl http://xx.xkcd.eu/time
```

## Optional: Add SSL

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d xx.xkcd.eu
```

## Useful Commands

- View logs: `tail -f /var/log/timeapi.err.log`
- Restart: `sudo supervisorctl restart timeapi`
- Stop: `sudo supervisorctl stop timeapi`
