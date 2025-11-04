import { useEffect, useState } from "react";
import { ScrollView, View, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
// app/today-words/index.tsx
import set1 from "./data/set1.json";
import set2 from "./data/set2.json";
import set3 from "./data/set3.json";
import set4 from "./data/set4.json";
import set5 from "./data/set5.json";
import set6 from "./data/set6.json";
import set7 from "./data/set7.json";
import set8 from "./data/set8.json";
import set9 from "./data/set9.json";
import set10 from "./data/set10.json";

type Word = { hanzi: string; pinyin: string; meaning: string };
type WordSets = Record<number, Word[]>; // ✅ キーがnumberの辞書型

// ✅ オブジェクトで定義
const sets: WordSets = {
  1: set1,
  2: set2,
  3: set3,
  4: set4,
  5: set5,
  6: set6,
  7: set7,
  8: set8,
  9: set9,
  10: set10,
};

export default function TodayWordsScreen() {
  const [setNumber, setSetNumber] = useState<number>(1); // 今日のセット番号
   const [words, setWords] = useState<Word[]>([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // JSON 読み込み
  useEffect(() => {
    setWords(sets[setNumber]);
  }, [setNumber]);

  if (!words.length) return <ThemedText>読み込み中...</ThemedText>;

  const current = words[index];
  const next = () =>
    index < words.length - 1 && (setIndex(index + 1), setShowAnswer(false));
  const prev = () => index > 0 && (setIndex(index - 1), setShowAnswer(false));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">📘 セット{setNumber} / 今日の単語</ThemedText>

      <View style={styles.card}>
        <View style={styles.cardInner}>
          <ThemedText style={styles.hanzi}>{current.hanzi}</ThemedText>

          {!showAnswer ? (
            <>
              <ThemedText style={styles.question}>
                この単語の読みは？
              </ThemedText>
              <Pressable
                style={styles.answerButton}
                onPress={() => setShowAnswer(true)}
              >
                <ThemedText style={styles.answerText}>答えを見る</ThemedText>
              </Pressable>
            </>
          ) : (
            <>
              <ThemedText style={styles.pinyin}>{current.pinyin}</ThemedText>
              <ThemedText style={styles.meaning}>
                意味：{current.meaning}
              </ThemedText>
              <Pressable
                style={styles.backButton}
                onPress={() => setShowAnswer(false)}
              >
                <ThemedText style={styles.backText}>問題に戻る</ThemedText>
              </Pressable>
              {/* <Pressable
                style={styles.backButton}
                onPress={() => setShowAnswer(false)}
              >
                <ThemedText style={styles.backText}>次の問題 →</ThemedText>
              </Pressable> */}
            </>
          )}
        </View>
      </View>

      <View style={styles.navButtons}>
        <Pressable
          onPress={prev}
          disabled={index === 0}
          style={[styles.navBtn, index === 0 && styles.disabled]}
        >
          <ThemedText>← 前へ</ThemedText>
        </Pressable>
        <Pressable
          onPress={next}
          disabled={index === words.length - 1}
          style={[styles.navBtn, index === words.length - 1 && styles.disabled]}
        >
          <ThemedText>次へ →</ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    height: 300,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardInner: { alignItems: "center", justifyContent: "center" },
  hanzi: { fontSize: 24, marginBottom: 20 },
  question: { fontSize: 18, marginBottom: 20 },
  answerButton: {
    backgroundColor: "#ff5555",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  answerText: { color: "#fff", fontWeight: "bold" },
  pinyin: { fontSize: 28, color: "#ff5555", marginTop: 10 },
  meaning: { fontSize: 18, marginTop: 6 },
  backButton: {
    marginTop: 20,
    borderColor: "#ff5555",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  backText: { color: "#ff5555", fontWeight: "bold" },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 30,
  },
  navBtn: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 },
  disabled: { opacity: 0.5 },
});
