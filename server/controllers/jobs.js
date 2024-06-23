const puppeteer = require('puppeteer');

const axios = require('axios');
const cheerio = require('cheerio');

exports.jobSearch = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/jobs/search?keywords=Information%20Technology&location=pakistan&geoId=&trk=public_jobs_jobs-search-bar_search-submit', { waitUntil: 'networkidle2' });

    let jobs = [];
    let loadMoreVisible = true;

    while (jobs.length < 200 && loadMoreVisible) {
      const newJobs = await page.evaluate(() => {
        const jobElements = document.querySelectorAll('.base-search-card');
        const jobs = [];
      console.log(jobElements);
      jobElements.forEach(jobElement => {
        const titleElement = jobElement.querySelector('.base-search-card__title');
        const companyElement = jobElement.querySelector('.base-search-card__subtitle a');
        const locationElement = jobElement.querySelector('.job-search-card__location');
        const postedElement = jobElement.querySelector('.job-search-card__listdate');
        const descriptionElement = jobElement.querySelector('.job-search-card__snippet'); // Example for job description snippet
        const linkElement = jobElement.querySelector('a'); // Job posting link

        const title = titleElement ? titleElement.innerText.trim() : 'N/A';
        const company = companyElement ? companyElement.innerText.trim() : 'N/A';
        const location = locationElement ? locationElement.innerText.trim() : 'N/A';
        const posted = postedElement ? postedElement.innerText.trim() : 'N/A';
        const description = descriptionElement ? descriptionElement.innerText.trim() : 'N/A';
        const link = linkElement ? linkElement.href : 'N/A';

        jobs.push({ title, company, location, posted, description, link });
      });

        return jobs;
      });

      jobs = jobs.concat(newJobs);

      // Check if "See more jobs" button is visible and click it
      loadMoreVisible = await page.evaluate(() => {
        const button = document.querySelector('.infinite-scroller__show-more-button');
        if (button) {
          button.click();
          return true;
        }
        return false;
      });

      // Wait for new job cards to load
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    await browser.close();
    res.json(jobs.slice(0, 200)); // Ensure only the first 200 jobs are sent
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







exports.Educationjobs = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://pk.linkedin.com/jobs/search?keywords=Education&location=Pakistan&geoId=&trk=public_jobs_jobs-search-bar_search-submit', { waitUntil: 'networkidle2' });

    let jobs = [];
    let loadMoreVisible = true;

    while (jobs.length < 200 && loadMoreVisible) {
      const newJobs = await page.evaluate(() => {
        const jobElements = document.querySelectorAll('.base-search-card');
        const jobs = [];

        jobElements.forEach(jobElement => {
          const titleElement = jobElement.querySelector('.base-search-card__title');
          const companyElement = jobElement.querySelector('.base-search-card__subtitle a');
          const locationElement = jobElement.querySelector('.job-search-card__location');
          const postedElement = jobElement.querySelector('.job-search-card__listdate');
          const descriptionElement = jobElement.querySelector('.job-search-card__snippet'); // Example for job description snippet
          const linkElement = jobElement.querySelector('a'); // Job posting link

          const title = titleElement ? titleElement.innerText.trim() : 'N/A';
          const company = companyElement ? companyElement.innerText.trim() : 'N/A';
          const location = locationElement ? locationElement.innerText.trim() : 'N/A';
          const posted = postedElement ? postedElement.innerText.trim() : 'N/A';
          const description = descriptionElement ? descriptionElement.innerText.trim() : 'N/A';
          const link = linkElement ? linkElement.href : 'N/A';

          jobs.push({ title, company, location, posted, description, link });
        });

        return jobs;
      });

      jobs = jobs.concat(newJobs);

      // Check if "See more jobs" button is visible and click it
      loadMoreVisible = await page.evaluate(() => {
        const button = document.querySelector('.infinite-scroller__show-more-button');
        if (button) {
          button.click();
          return true;
        }
        return false;
      });

      // Wait for new job cards to load
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    await browser.close();
    res.json(jobs.slice(0, 200)); // Ensure only the first 200 jobs are sent
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





// exports.internshipSearch = async (req, res) => {
//   try {
//       const browser = await puppeteer.launch({ headless: true });
//       const page = await browser.newPage();
//       await page.goto('https://pk.indeed.com/jobs?q=internship&l=Pakistan&start=10&pp=gQAPAAAAAAAAAAAAAAACKvS1dgAjAQAy3SNhWb6mjoXOGg_IZVPLmkiWEHdX_tX1vZ1NWGlbuVgAAA', { waitUntil: 'domcontentloaded' });

//       let internships = [];

//       while (internships.length < 200) {
//           const newInternships = await page.evaluate(() => {
//               const internshipElements = document.querySelectorAll('.jobsearch-SerpJobCard');
//               const internships = [];

//               internshipElements.forEach(internshipElement => {
//                   const titleElement = internshipElement.querySelector('.title a');
//                   const companyElement = internshipElement.querySelector('.company');
//                   const locationElement = internshipElement.querySelector('.location');
//                   const postedElement = internshipElement.querySelector('.date');
//                   const linkElement = internshipElement.querySelector('.title a');

//                   const title = titleElement ? titleElement.innerText.trim() : 'N/A';
//                   const company = companyElement ? companyElement.innerText.trim() : 'N/A';
//                   const location = locationElement ? locationElement.innerText.trim() : 'N/A';
//                   const posted = postedElement ? postedElement.innerText.trim() : 'N/A';
//                   const link = linkElement ? linkElement.href : 'N/A';

//                   internships.push({ title, company, location, posted, link });
//               });

//               return internships;
//           });

//           internships = internships.concat(newInternships);

//           // Clicking on the next page button
//           const nextButton = await page.$('.pagination .pn');
//           if (nextButton) {
//               await nextButton.click();
//               console.log('Navigating to next page...');
//               await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
//               console.log('Page navigation complete.');
//           } else {
//               console.log('No more pages to navigate.');
//               break;
//           }
//       }

//       await browser.close();
//       console.log('Scraping complete.');
//       res.json(internships.slice(0, 200)); // Ensure only the first 200 internships are sent
//   } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// fetch("https://pk.indeed.com/jobs?q=internship&l=Pakistan&start=10&pp=gQAPAAAAAAAAAAAAAAACKvS1dgAjAQAy3SNhWb6mjoXOGg_IZVPLmkiWEHdX_tX1vZ1NWGlbuVgAAA", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//     "accept-language": "en-US,en;q=0.9",
//     "priority": "u=0, i",
//     "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1",
//     "cookie": "CTK=1hvl2nmk7g3lb800; RF=\"TFTzyBUJoNr6YttPP3kyivpZ6-9J49o-Uk3iY6QNQqKE2fh7FyVgtUR8wMa1jbzFwRslZszHY8k=\"; CSRF=VHC25QFvNfaLPuEmAKu9Hsf0mjap4tJV; INDEED_CSRF_TOKEN=88MPd9CJaPf8tIR8ZNH5wtknY8yTaG4c; LV=\"LA=1717620693:CV=1717620693:TS=1717620693\"; SURF=mZy5ns81MvTiW50axaz1zHtJ50IAYQNk; _ga=GA1.1.261305776.1717620697; FPID=FPID2.2.WhKLfM0PGvyFw4DyUdpsyqXLEXiG%2B%2F56bMjdYHtjL1Y%3D.1717620697; FPLC=B5SfdDsmZU11k5Iv4Qxpvo1Kc3MPd24F6y%2FCIc5M75wVUF2y8m1n8nhaKT4NwC36hC90esNErT%2FUM%2BT8aOilnLZmF0SPmvbZ6u6f8rFWbcCKlBs0xvhZyqgBcxTw9A%3D%3D; PREF=\"TM=1717620711884:L=Pakistan\"; _gcl_au=1.1.1427720259.1717620714; LC=\"co=PK\"; LOCALE=en_PK; MICRO_CONTENT_CSRF_TOKEN=HKjs4CdENIvox7BETAAXFSpdmgh4hLTA; PPID=\"\"; SHARED_INDEED_CSRF_TOKEN=88MPd9CJaPf8tIR8ZNH5wtknY8yTaG4c; __cf_bm=zNyden5vTF2bqlA752IZ6iU2dGNYHmarTLm79u4P41c-1717620853-1.0.1.1-lUNL_P1TcHPVIJ_6ex29P48RAepj4i53H2jl8V8fJproBrApu4hkJcMGLgNH8nW6pP6exTv6rwcHUCRj6CF2_w; _cfuvid=JAocQUhnLQrwc4p8RXR25Lb9uIb.o7dqS_x6LTt9tto-1717620853557-0.0.1.1-604800000; LOCALE=en_PK; indeed_rcc=\"LOCALE:PREF:LV:CTK:RQ\"; ROJC=2adb2d81130c11a8:8dbe2170e140ef7f:f94fad0f0e3474a7; RQ=\"q=internship&l=Pakistan&ts=1717620991534&rbsalmin=0&rbsalmax=0:q=education&l=Pakistan&ts=1717620779126&rbsalmin=0&rbsalmax=0\"; JSESSIONID=46B48E2CC7432D5C8D47F06F56CDC7DB; _ga_LYNT3BTHPG=GS1.1.1717620697.1.1.1717620996.0.0.1249125132; PTK=\"tk=1hvl30ph332do000&type=jobsearch&subtype=pagination&fp=1\"",
//     "Referer": "https://pk.indeed.com/jobs?q=internship&l=Pakistan&from=searchOnHP&vjk=b44de912ec880a82",
//     "Referrer-Policy": "origin-when-cross-origin"
//   },
//   "body": null,
//   "method": "GET"
// });


exports.internshipSearch = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://pk.indeed.com/jobs?q=internship&l=Pakistan&start=0', { waitUntil: 'domcontentloaded' });

    let internships = [];

    while (internships.length < 200) {
      const newInternships = await page.evaluate(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const internshipElements = document.querySelectorAll('.jobsearch-SerpJobCard');
            const internships = [];

            internshipElements.forEach(internshipElement => {
              const titleElement = internshipElement.querySelector('.title a');
              const companyElement = internshipElement.querySelector('.company');
              const locationElement = internshipElement.querySelector('.location');
              const dateElement = internshipElement.querySelector('.date');

              const title = titleElement ? titleElement.textContent.trim() : 'N/A';
              const company = companyElement ? companyElement.textContent.trim() : 'N/A';
              const location = locationElement ? locationElement.textContent.trim() : 'N/A';
              const datePosted = dateElement ? dateElement.textContent.trim() : 'N/A';

              internships.push({ title, company, location, datePosted });
            });

            resolve(internships);
          }, 3000); // Adjust the wait time as needed
        });
      });

      internships = internships.concat(newInternships);

      // Scroll to load more job listings
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    }

    await browser.close();
    res.json(internships.slice(0, 200)); // Ensure only the first 200 internships are sent
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

