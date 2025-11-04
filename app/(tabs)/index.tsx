import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  // 仮データ：ランダムで「今日の一問」or「コラム」を表示
  const dailyTopic = {
    type: "quiz", // "quiz" or "column"
    question: "「加油」の意味は？",
    answer: "がんばって！",
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">🇨🇳 Chinese Practice</ThemedText>
        <ThemedText>今日も少しずつ、成長しよう。</ThemedText>
      </ThemedView>

      <View style={styles.progress}>
        <ThemedText>今日の学習進捗：3 / 10 単語</ThemedText>
        <View style={styles.progressBar}>
          <View style={[styles.progressInner, { width: "30%" }]} />
        </View>
      </View>

      {/* === 今日のトピック === */}
      {/* <View style={styles.topicContainer}>
        <ThemedText style={styles.topicTitle}>🧠 今日のトピック</ThemedText>
        {dailyTopic.type === "quiz" ? (
          <>
            <ThemedText style={styles.topicQuestion}>
              {dailyTopic.question}
            </ThemedText>
            <ThemedText style={styles.topicAnswer}>
              💬 {dailyTopic.answer}
            </ThemedText>
          </>
        ) : (
          <ThemedText style={styles.topicColumn}>
            今日のひとこと：「吃了吗？」＝「ご飯食べた？」（挨拶）
          </ThemedText>
        )}
      </View> */}

      {/* 今日の単語を学ぶ */}
      <Pressable
        style={styles.startButton}
        onPress={() => router.push("/today-words")}
      >
        <ThemedText style={styles.startText}>▶ 今日の単語を学ぶ</ThemedText>
      </Pressable>

      {/* 自作単語帳へ */}
      <Pressable
        style={styles.customButton}
        onPress={() => router.push("/my-words")}
      >
        <ThemedText style={styles.customText}>📚 自作単語帳へ</ThemedText>
      </Pressable>

      <View style={styles.footer}>
        <ThemedText style={styles.footerLink}>📖 復習する</ThemedText>
        <ThemedText style={styles.footerLink}>⭐ お気に入り</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { alignItems: "center", marginVertical: 30 },
  topicContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  topicTitle: { fontWeight: "bold", marginBottom: 8 },
  topicQuestion: { fontSize: 16, marginBottom: 4 },
  topicAnswer: { color: "#ff5555", fontWeight: "bold" },
  topicColumn: { fontSize: 15, lineHeight: 22 },
  progress: { marginVertical: 20 },
  progressBar: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 8,
  },
  progressInner: {
    height: "100%",
    backgroundColor: "#ff5555",
  },
  startButton: {
    backgroundColor: "#ff5555",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  startText: { color: "#fff", fontWeight: "bold" },
  customButton: {
    borderColor: "#ff5555",
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  customText: { color: "#ff5555", fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "space-around", marginTop: 30 },
  footerLink: { color: "#888" },
});
