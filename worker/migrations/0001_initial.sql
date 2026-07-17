CREATE TABLE IF NOT EXISTS leaderboard_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course TEXT NOT NULL,
  course_version TEXT NOT NULL,
  player_name TEXT NOT NULL CHECK(length(player_name) BETWEEN 1 AND 24),
  player_id_hash TEXT NOT NULL,
  correct_answers INTEGER NOT NULL CHECK(correct_answers >= 0),
  total_answers INTEGER NOT NULL CHECK(total_answers > 0),
  duration_seconds INTEGER NOT NULL CHECK(duration_seconds BETWEEN 20 AND 7200),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course, course_version, player_id_hash)
);

CREATE INDEX IF NOT EXISTS leaderboard_ranking
ON leaderboard_scores(course, course_version, correct_answers DESC, duration_seconds ASC, created_at ASC);
