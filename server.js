const express = require('express')
const ejs = require('ejs')
const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require('fs');



const url = 'https://123job.vn/tuyen-dung';

request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);
        const data = [];
        $('.job__list-item').each((index, el) => {
            const imageJob = $(el).find('.job__list-item-thumb img').attr('data-src');
            const job = $(el).find('.job__list-item-title').text();
            const company = $(el).find('.job__list-item-company span').text();
            const address = $(el).find('.job__list-item-info').find('.address').text();
            const salary = $(el).find('.job__list-item-info').find('.salary').text();
            const description = $(el).find('.job__list-item-teaser').text();
            console.log(String(imageJob));
            data.push({
                imageJob,
                job,
                company,
                address,
                salary,
                description,
            })
        })

        fs.writeFileSync('data.json', JSON.stringify(data));
    } else {
        console.log(error);
    }
})