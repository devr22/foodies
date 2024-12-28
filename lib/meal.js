import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals () {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // throw new Error('Loading meals failed');
    return db.prepare('select * from meals').all();
}

export async function getMeal (slug) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return db.prepare('select * from meals where slug = ?').get(slug);
}

export async function saveMeal (meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        insert into meals 
            (slug, title, image, summary, instructions, creator, creator_email) 
        values (
            @slug,
            @title,
            @image,
            @summary,
            @instructions,
            @creator,
            @creator_email
        )
    `).run(meal);
}
