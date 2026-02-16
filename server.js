// Cloudflare Worker - Random User API (Extended Version with More Names)

const maleFirstNames = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Kenneth', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
  'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
  'Benjamin', 'Samuel', 'Raymond', 'Gregory', 'Alexander', 'Patrick', 'Frank', 'Dennis', 'Jerry', 'Tyler',
  'Aaron', 'Jose', 'Adam', 'Henry', 'Nathan', 'Douglas', 'Zachary', 'Peter', 'Kyle', 'Walter',
  'Ethan', 'Jeremy', 'Harold', 'Keith', 'Christian', 'Roger', 'Noah', 'Gerald', 'Carl', 'Terry',
  'Sean', 'Austin', 'Arthur', 'Lawrence', 'Jesse', 'Dylan', 'Bryan', 'Joe', 'Jordan', 'Billy',
  'Bruce', 'Albert', 'Willie', 'Gabriel', 'Logan', 'Alan', 'Juan', 'Wayne', 'Roy', 'Ralph',
  'Randy', 'Eugene', 'Vincent', 'Russell', 'Elijah', 'Louis', 'Bobby', 'Philip', 'Johnny', 'Bradley'
];

const femaleFirstNames = [
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
  'Dorothy', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia',
  'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela', 'Emma', 'Nicole', 'Helen',
  'Samantha', 'Katherine', 'Christine', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Catherine', 'Maria', 'Heather',
  'Diane', 'Ruth', 'Julie', 'Olivia', 'Joyce', 'Virginia', 'Victoria', 'Kelly', 'Lauren', 'Christina',
  'Joan', 'Evelyn', 'Judith', 'Megan', 'Andrea', 'Cheryl', 'Hannah', 'Jacqueline', 'Martha', 'Gloria',
  'Teresa', 'Ann', 'Sara', 'Madison', 'Frances', 'Kathryn', 'Janice', 'Jean', 'Abigail', 'Alice',
  'Brittany', 'Denise', 'Beverly', 'Danielle', 'Amber', 'Theresa', 'Marilyn', 'Diana', 'Natalie', 'Sophia',
  'Rose', 'Isabella', 'Alexis', 'Kayla', 'Charlotte', 'Grace', 'Doris', 'Judy', 'Julia', 'Marie'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Thompson', 'White', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen',
  'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson',
  'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans',
  'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales',
  'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed',
  'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez',
  'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo',
  'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez', 'Powell', 'Jenkins', 'Perry',
  'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler', 'Henderson', 'Barnes', 'Gonzales', 'Fisher', 'Vasquez',
  'Simmons', 'Romero', 'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham', 'Reynolds', 'Griffin', 'Wallace',
  'Moreno', 'West', 'Cole', 'Hayes', 'Bryant', 'Herrera', 'Gibson', 'Ellis', 'Tran', 'Medina',
  'Aguilar', 'Stevens', 'Murray', 'Ford', 'Castro', 'Marshall', 'Owens', 'Harrison', 'Fernandez', 'McDonald',
  'Woods', 'Washington', 'Kennedy', 'Wells', 'Vargas', 'Henry', 'Chen', 'Freeman', 'Webb', 'Tucker'
];

const streets = [
  'Main Street', 'High Street', 'Park Avenue', 'Oak Lane', 'Maple Drive', 'Church Road', 'Station Road', 'Mill Lane',
  'Victoria Road', 'Green Lane', 'Queens Road', 'Kings Road', 'The Avenue', 'Bridge Street', 'London Road', 'York Road',
  'New Street', 'West Street', 'Richmond Road', 'Manor Road', 'North Street', 'South Street', 'East Street', 'Market Street',
  'Chapel Street', 'Albert Street', 'George Street', 'Duke Street', 'Princess Street', 'Church Street', 'Castle Street',
  'Victoria Street', 'Park Road', 'School Lane', 'Mill Road', 'Grove Road', 'Windsor Road', 'Alexandra Road', 'Springfield Road',
  'Hillside Road', 'Woodland Avenue', 'Cedar Avenue', 'Elm Street', 'Willow Lane', 'Beech Road', 'Pine Grove', 'Sycamore Drive',
  'Chestnut Close', 'Orchard Way', 'Fairfield Road', 'Riverside Drive', 'Meadow Lane', 'Station Approach', 'Railway Terrace',
  'Oxford Road', 'Cambridge Street', 'Edinburgh Way', 'Bristol Avenue', 'Manchester Road', 'Liverpool Street', 'Birmingham Road',
  'Newcastle Drive', 'Leeds Road', 'Sheffield Lane', 'Regent Street', 'Piccadilly', 'Strand', 'Fleet Street', 'Whitehall',
  'Park Crescent', 'The Crescent', 'The Gardens', 'The Green', 'The Grove', 'The Drive', 'The Rise', 'The Mount',
  'Grosvenor Road', 'Pembroke Road', 'Buckingham Street', 'Wellington Road', 'Nelson Street', 'Trafalgar Road', 'Coronation Street',
  'Jubilee Road', 'Commonwealth Avenue', 'Imperial Drive', 'Kingsway', 'Queensway', 'Broadway', 'The Broadway', 'Bath Road'
];

const cities = [
  'London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol',
  'Edinburgh', 'Glasgow', 'Cardiff', 'Belfast', 'Southampton', 'Leicester', 'Nottingham', 'Coventry',
  'Bradford', 'Stoke', 'Wolverhampton', 'Plymouth', 'Aberdeen', 'Derby', 'Portsmouth', 'Brighton',
  'Reading', 'Northampton', 'Luton', 'Bolton', 'Preston', 'Sunderland', 'Norwich', 'Swansea',
  'Milton Keynes', 'Dundee', 'Swindon', 'Oxford', 'Cambridge', 'York', 'Bath', 'Canterbury',
  'Chester', 'Durham', 'Exeter', 'Gloucester', 'Lancaster', 'Lincoln', 'Salisbury', 'Winchester',
  'Worcester', 'Carlisle', 'Inverness', 'Stirling', 'Perth', 'Peterborough', 'Ipswich', 'Colchester',
  'Blackpool', 'Bournemouth', 'Chelmsford', 'Cheltenham', 'Doncaster', 'Grimsby', 'Hastings', 'Huddersfield',
  'Hull', 'Maidstone', 'Middlesbrough', 'Oldham', 'Poole', 'Rochdale', 'Rotherham', 'Salford',
  'Slough', 'Southend', 'Stockport', 'Telford', 'Wakefield', 'Warrington', 'Watford', 'Wigan',
  'Worthing', 'Basildon', 'Blackburn', 'Burnley', 'Darlington', 'Gateshead', 'Hartlepool', 'Harrow',
  'Hemel Hempstead', 'High Wycombe', 'Kidderminster', 'Barnsley', 'Scunthorpe', 'St Albans', 'Stevenage'
];

const states = [
  'England', 'Scotland', 'Wales', 'Northern Ireland', 'Greater London', 'West Midlands', 'Greater Manchester',
  'West Yorkshire', 'Merseyside', 'South Yorkshire', 'Tyne and Wear', 'East Midlands', 'East of England',
  'South East England', 'South West England', 'North West England', 'North East England', 'Yorkshire and the Humber',
  'Kent', 'Essex', 'Hampshire', 'Surrey', 'Hertfordshire', 'Lancashire', 'Cheshire', 'Berkshire',
  'Buckinghamshire', 'Oxfordshire', 'Cambridgeshire', 'Norfolk', 'Suffolk', 'Somerset', 'Devon', 'Cornwall',
  'Dorset', 'Wiltshire', 'Gloucestershire', 'Worcestershire', 'Warwickshire', 'Staffordshire', 'Shropshire',
  'Herefordshire', 'Derbyshire', 'Nottinghamshire', 'Leicestershire', 'Northamptonshire', 'Lincolnshire',
  'County Durham', 'Northumberland', 'Cumbria', 'North Yorkshire', 'East Riding of Yorkshire',
  'Lothian', 'Strathclyde', 'Grampian', 'Highland', 'Tayside', 'Fife', 'Borders', 'Dumfries and Galloway',
  'Clwyd', 'Dyfed', 'Gwent', 'Gwynedd', 'Mid Glamorgan', 'Powys', 'South Glamorgan', 'West Glamorgan',
  'Antrim', 'Armagh', 'Down', 'Fermanagh', 'Londonderry', 'Tyrone'
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
  return array[randomInt(0, array.length - 1)];
}

function generateUUID() {
  return crypto.randomUUID();
}

async function generateHash(algorithm, text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generatePostcode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const part1 = letters[randomInt(0, 25)] + letters[randomInt(0, 25)] + randomInt(10, 99);
  const part2 = randomInt(1, 9) + letters[randomInt(0, 25)] + letters[randomInt(0, 25)];
  return `${part1} ${part2}`;
}

function generatePhoneNumber() {
  return `01${randomInt(1000, 9999)} ${randomInt(100000, 999999)}`;
}

function generateMobileNumber() {
  return `07${randomInt(100, 999)} ${randomInt(100000, 999999)}`;
}

function generateUsername() {
  const adjectives = ['happy', 'lazy', 'smart', 'brave', 'quick', 'silent', 'blue', 'red', 'green', 'golden'];
  const animals = ['tiger', 'lion', 'bear', 'wolf', 'eagle', 'falcon', 'shark', 'fox', 'panda', 'leopard'];
  return randomChoice(adjectives) + randomChoice(animals) + randomInt(100, 999);
}

function generatePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars[randomInt(0, chars.length - 1)];
  }
  return password;
}

function generateSalt() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let salt = '';
  for (let i = 0; i < 8; i++) {
    salt += chars[randomInt(0, chars.length - 1)];
  }
  return salt;
}

function generateRandomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

function calculateAge(dateString) {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function generateNINO() {
  const letters = 'ABCDEFGHJKLMNPRSTWXYZ';
  const prefix = letters[randomInt(0, letters.length - 1)] + letters[randomInt(0, letters.length - 1)];
  const numbers = `${randomInt(10, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)}`;
  const suffix = 'ABCD'[randomInt(0, 3)];
  return `${prefix} ${numbers} ${suffix}`;
}

async function generateUser(gender) {
  let finalGender;
  if (gender === 'male' || gender === 'female') {
    finalGender = gender;
  } else {
    finalGender = Math.random() < 0.5 ? 'male' : 'female';
  }

  const isMale = finalGender === 'male';
  const title = isMale ? 'Mr' : (Math.random() < 0.7 ? 'Ms' : (Math.random() < 0.5 ? 'Mrs' : 'Miss'));
  const firstName = isMale ? randomChoice(maleFirstNames) : randomChoice(femaleFirstNames);
  const lastName = randomChoice(lastNames);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const username = generateUsername();
  const password = generatePassword();
  const salt = generateSalt();
  const uuid = generateUUID();
  const streetNumber = randomInt(1, 9999);
  const streetName = randomChoice(streets);
  const city = randomChoice(cities);
  const state = randomChoice(states);
  const postcode = generatePostcode();
  const phone = generatePhoneNumber();
  const cell = generateMobileNumber();
  const dobDate = generateRandomDate(1950, 2005);
  const dobAge = calculateAge(dobDate);
  const registeredDate = generateRandomDate(2005, 2023);
  const registeredAge = calculateAge(registeredDate);
  const nino = generateNINO();
  
  const pictureId = randomInt(1, 99);
  const genderPath = isMale ? 'men' : 'women';

  const passwordWithSalt = password + salt;
  const md5 = await generateHash('MD5', passwordWithSalt);
  const sha1 = await generateHash('SHA-1', passwordWithSalt);
  const sha256 = await generateHash('SHA-256', passwordWithSalt);

  return {
    gender: finalGender,
    name: { title, first: firstName, last: lastName },
    location: {
      street: { number: streetNumber, name: streetName },
      city, state,
      country: 'United Kingdom',
      postcode,
      coordinates: {
        latitude: (Math.random() * 180 - 90).toFixed(4),
        longitude: (Math.random() * 360 - 180).toFixed(4)
      },
      timezone: {
        offset: randomChoice(['+00:00', '+01:00', '+02:00', '+03:00', '+04:00', '+05:00', '-05:00', '-06:00']),
        description: randomChoice(['GMT', 'Central European Time', 'Eastern European Time', 'Indian Standard Time'])
      }
    },
    email,
    login: { uuid, username, password, salt, md5, sha1, sha256 },
    dob: { date: dobDate, age: dobAge },
    registered: { date: registeredDate, age: registeredAge },
    phone, cell,
    id: { name: 'NINO', value: nino },
    picture: {
      large: `https://randomuser.me/api/portraits/${genderPath}/${pictureId}.jpg`,
      medium: `https://randomuser.me/api/portraits/med/${genderPath}/${pictureId}.jpg`,
      thumbnail: `https://randomuser.me/api/portraits/thumb/${genderPath}/${pictureId}.jpg`
    },
    nat: 'GB'
  };
}

export default {
  async fetch(request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;
    const gender = url.searchParams.get('gender') || 'random';

    if (pathname === '/api/user' && request.method === 'GET') {
      if (gender !== 'male' && gender !== 'female' && gender !== 'random') {
        return new Response(
          JSON.stringify({ error: 'Invalid gender parameter. Must be "male", "female", or "random"' }),
          { status: 400, headers: corsHeaders }
        );
      }

      const user = await generateUser(gender);
      return new Response(JSON.stringify(user, null, 2), { status: 200, headers: corsHeaders });
    }
    
    if (pathname === '/' && request.method === 'GET') {
      return new Response(
        JSON.stringify({
          message: 'Random User API - Extended Version',
          version: '2.0',
          dataSize: {
            maleNames: maleFirstNames.length,
            femaleNames: femaleFirstNames.length,
            lastNames: lastNames.length,
            streets: streets.length,
            cities: cities.length,
            states: states.length
          },
          endpoints: {
            '/api/user': 'Generate a random user',
            '/api/user?gender=male': 'Generate a random male user',
            '/api/user?gender=female': 'Generate a random female user',
            '/api/user?gender=random': 'Generate a random user (default)'
          }
        }, null, 2),
        { status: 200, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Endpoint not found' }),
      { status: 404, headers: corsHeaders }
    );
  }
};
