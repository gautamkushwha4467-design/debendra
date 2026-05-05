import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const databasePath = join(__dirname, 'careerai.db');
const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1);
  }
});

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export async function initializeDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      passwordHash TEXT,
      education TEXT,
      interests TEXT,
      skills TEXT,
      createdAt TEXT
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS careers (
      id TEXT PRIMARY KEY,
      title TEXT,
      matchPercent INTEGER,
      description TEXT,
      salaryRange TEXT,
      demandLevel TEXT,
      focusAreas TEXT,
      idealFor TEXT
    )
  `);

  const existing = await get('SELECT COUNT(*) as count FROM careers');
  if (!existing || existing.count === 0) {
    const careers = [
      {
        id: 'product-manager',
        title: 'Product Manager',
        matchPercent: 94,
        description: 'Coordinate teams, strategy, and product delivery for high-impact initiatives.',
        salaryRange: '$95k - $145k',
        demandLevel: 'High',
        focusAreas: 'Product strategy, analytics, stakeholder management',
        idealFor: 'Creative problem solvers and organized planners'
      },
      {
        id: 'data-analyst',
        title: 'Data Analyst',
        matchPercent: 88,
        description: 'Translate data into insights and build strong business recommendations.',
        salaryRange: '$75k - $120k',
        demandLevel: 'Growing',
        focusAreas: 'Data visualization, SQL, business intelligence',
        idealFor: 'Analytical thinkers with strong communication skills'
      },
      {
        id: 'ux-designer',
        title: 'UX Designer',
        matchPercent: 82,
        description: 'Design easy-to-use products with research-driven creativity.',
        salaryRange: '$70k - $110k',
        demandLevel: 'Strong',
        focusAreas: 'User research, prototyping, interaction design',
        idealFor: 'Empathetic creatives and problem solvers'
      }
    ];

    const insert = db.prepare(
      'INSERT INTO careers (id, title, matchPercent, description, salaryRange, demandLevel, focusAreas, idealFor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );

    careers.forEach((career) => {
      insert.run([
        career.id,
        career.title,
        career.matchPercent,
        career.description,
        career.salaryRange,
        career.demandLevel,
        career.focusAreas,
        career.idealFor
      ]);
    });
    insert.finalize();
  }
}
