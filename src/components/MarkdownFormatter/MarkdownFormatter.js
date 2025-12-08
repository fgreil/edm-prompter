import React from "react";
import { Text, Linking, StyleSheet, Pressable } from "react-native";

// ---------------------------------------------------------------------------
// A LIGHTWEIGHT MARKDOWN PARSER FOR:
//  - **bold**
//  - _italic_
//  - [link text](https://example.com)
//  - - bullet points
//  - 1. numbered lists
// ---------------------------------------------------------------------------

// Regex patterns
const patterns = {
  bold: /\*\*(.*?)\*\*/g,
  italic: /_(.*?)_/g,
  link: /\[([^\]]+)\]\(([^)]+)\)/g,
  bullet: /^-\s+(.*)/gm,
  numbered: /^\d+\.\s+(.*)/gm
};

// ---------------------------------------------------------------------------
// Parse Markdown text into an array of segments:
// Each item: { type: "text" | "bold" | "italic" | "link" | "bullet" | "numbered", content, url? }
// ---------------------------------------------------------------------------

function parseMarkdown(text) {
  if (!text || typeof text !== "string") return [{ type: "text", content: "" }];

  const segments = [];

  // STEP 1 → Split by newline to keep paragraph structure
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    // Bullet list
    if (patterns.bullet.test(line)) {
      const match = line.match(patterns.bullet);
      segments.push({
        type: "bullet",
        content: line.replace(/^-+\s*/, "")
      });
      continue;
    }

    // Numbered list
    if (patterns.numbered.test(line)) {
      segments.push({
        type: "numbered",
        content: line.replace(/^\d+\.\s*/, "")
      });
      continue;
    }

    // STEP 2 → Inline formatting inside each line
    let remaining = line;
    let match;

    const inlinePatterns = [
      { type: "bold", regex: patterns.bold },
      { type: "italic", regex: patterns.italic },
      { type: "link", regex: patterns.link }
    ];

    const collected = [];

    // Find all inline markdown patterns
    inlinePatterns.forEach(({ type, regex }) => {
      let m;
      while ((m = regex.exec(line)) !== null) {
        collected.push({
          type,
          start: m.index,
          end: m.index + m[0].length,
          content: m[1],
          url: m[2] // for links only
        });
      }
    });

    // Sort by position in string
    collected.sort((a, b) => a.start - b.start);

    // STEP 3 → Convert regex results into text pieces
    let cursor = 0;

    for (const item of collected) {
      if (cursor < item.start) {
        segments.push({
          type: "text",
          content: remaining.substring(cursor, item.start)
        });
      }

      segments.push({
        type: item.type,
        content: item.content,
        url: item.url
      });

      cursor = item.end;
    }

    // Tail end of the line
    if (cursor < remaining.length) {
      segments.push({
        type: "text",
        content: remaining.substring(cursor)
      });
    }

    // Add a newline break between lines
    segments.push({ type: "text", content: "\n" });
  }

  return segments;
}

// ---------------------------------------------------------------------------
// MarkdownFormatter component
// ---------------------------------------------------------------------------

export default function MarkdownFormatter({
  text,
  style = {},
  numberOfLines = 0
}) {
  const segments = parseMarkdown(text);

  return (
    <Text style={[style]} numberOfLines={numberOfLines}>
      {segments.map((seg, idx) => {
        if (seg.type === "bold") {
          return (
            <Text key={idx} style={styles.bold}>
              {seg.content}
            </Text>
          );
        }

        if (seg.type === "italic") {
          return (
            <Text key={idx} style={styles.italic}>
              {seg.content}
            </Text>
          );
        }

        if (seg.type === "bullet") {
          return (
            <Text key={idx} style={styles.bullet}>
              • {seg.content + "\n"}
            </Text>
          );
        }

        if (seg.type === "numbered") {
          return (
            <Text key={idx} style={styles.numbered}>
              • {seg.content + "\n"}
            </Text>
          );
        }

        if (seg.type === "link") {
          return (
            <Text
              key={idx}
              style={styles.link}
              onPress={() => Linking.openURL(seg.url)}
            >
              {seg.content}
            </Text>
          );
        }

        return seg.content ? <Text key={idx}>{seg.content}</Text> : null;
      })}
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  },
  italic: {
    fontStyle: "italic"
  },
  link: {
    color: "#3366BB",
    textDecorationLine: "underline"
  },
  bullet: {
    marginLeft: 10
  },
  numbered: {
    marginLeft: 10
  }
});
