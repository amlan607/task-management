const db = require('./src/config/db');

function formatMySQLDate(d) {
  // YYYY-MM-DD HH:MM:SS
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

const samples = Array.from({ length: 15 }).map((_, i) => {
  const idx = i + 1;
  const created = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
  const statuses = ['todo', 'in-progress', 'done'];
  const status = statuses[i % statuses.length];
  return {
    title: `Seed Task ${idx}`,
    description: `This is sample task number ${idx}. Status: ${status}. Generated for seeding.`,
    created_at: formatMySQLDate(created),
  };
});

(async () => {
  try {
    // Check which of these seed titles already exist to avoid duplicates
    const titles = samples.map(s => s.title);
    const placeholders = titles.map(() => '?').join(',');
    const [existingRows] = await db.query(
      `SELECT title FROM tasks WHERE title IN (${placeholders})`,
      titles
    );

    const existing = new Set(existingRows.map(r => r.title));

    const toInsert = samples.filter(s => !existing.has(s.title));

    if (toInsert.length === 0) {
      console.log('No seed needed: sample tasks already present.');
      await db.end();
      return;
    }

    console.log(`Inserting ${toInsert.length} sample tasks...`);

    for (const t of toInsert) {
      await db.query(
        'INSERT INTO tasks (title, description, created_at) VALUES (?, ?, ?)',
        [t.title, t.description, t.created_at]
      );
    }

    console.log('Seeding complete.');
    await db.end();
  } catch (err) {
    console.error('Seeding failed:', err.message || err);
    try { await db.end(); } catch (e) {}
    process.exit(1);
  }
})();
