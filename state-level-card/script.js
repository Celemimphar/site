import getRole from "./roles.js";

const img = document.getElementById('img-box');
const displayName = document.getElementById('display-name');
const username = document.getElementById('username');
const level = document.getElementById('level');
const currentXp = document.getElementById('xp-current');
const nextXp = document.getElementById('xp-next');
const xpBar = document.getElementById('xp-bar');
const xpFill = document.getElementById('xp-fill');
const rolesBox = document.getElementById('roles-box');
const roleIconFrame = document.getElementById('icon');
const roleIcon = document.getElementById('role');

const defaultColor = ['196, 201, 206'];
const d = {
    displayname: 'Ish',
    username: 'ish13c',
    img: 'https://cdn.discordapp.com/avatars/190831928788647937/8e432da14530d5e3dfdbd5c4ef468382.webp?size=128',
    level: '53',
    currentxp: '319937',
    nextxp: '332145',
    roles: [
        'ish+',
        'Verified',
        'State Awards Winner \'23',
        'State Awards Winner \'22',
        'Duolingo Club',
        'YT Member',
        'Level 50'
    ]
}

const roleImgUrl = (i) => `https://cdn.discordapp.com/role-icons/${i.url}.webp?size=128&quality=lossless`;

const roleImgElement = (name, src, dim) => `<img alt="Role icon, ${name}" title="${name}" src=${src} width="${dim}">`;

const calcXP = (x, y) => (y == 0) ? 100 : Math.floor((x / y) * 100);

const addCommas = (n) => {
    const a = `${n}`;
    if (n <= 999) return a;

    let b = [];
    for (let i = a.length - 1; i >= 0; i -= 3) b.push(`${a[i - 2] ?? ''}${a[i - 1] ?? ''}${a[i]}`);

    let c = '';
    for (let i = 0; i < b.length; i++) c = `${b[i]},${c}`;

    let d = '';
    for (let i = 0; i < c.length - 1; i++) d += `${c[i]}`;

    return d
}

const backgroundColor = (c = defaultColor) => `rgba(${c}, 0.6)`;
const outlineColor = (c = defaultColor) => `rgba(${c}, 0.153)`;
const nameColor = (c = defaultColor) => `rgb(${c})`;

const getLevelBackgroundColor = (l) => backgroundColor(getRole(getLevelId(l)).color);
const getLevelOutlineColor = (l) => outlineColor(getRole(getLevelId(l)).color);
const getLevelNameColor = (l) => nameColor(getRole(getLevelId(l)).color);

const getLevelId = (l) => (l > 39) ? (l > 79) ? (l > 99) ? "908867866495975474" : (l > 89) ? "1122588281721335899" : "1122588271436906546" : (l > 59) ? (l > 69) ? "906513921245069353" : "1122588273575993415" : (l > 49) ? "906329186338209813" : "1122588276176453725" : (l > 9) ? (l > 19) ? (l > 29) ? "922211240690995201" : "906329125667614750" : (l > 14) ? "1122588278168760495" : "906329059997413417" : (l > 0) ? (l > 4) ? "906328953759875072" : "1122588268706406400" : undefined;

const setData = () => {
    const x = d.displayname.length;
    displayName.style.fontSize = `${(x < 18) ? 2 : (x < 27) ? 1.6 : 1.3}em`;
    displayName.textContent = d.displayname;
    displayName.style.color = getLevelNameColor(d.level)

    const y = d.username.length;
    username.style.fontSize =  `${(y < 18) ? 1.2 : (y < 27) ? 1.1 : 1}em`;
    username.textContent = d.username;

    img.innerHTML = `<img src="${d.img}" alt="profile picture">`;

    level.textContent = d.level;
    currentXp.textContent = addCommas(d.currentxp)
    nextXp.textContent = addCommas(d.nextxp)

    xpBar.style.borderColor = getLevelOutlineColor(d.level)
    xpBar.style.outline = `1px solid ${getLevelBackgroundColor(d.level)}`
    xpBar.style.boxShadow = `0 2px 3px ${getLevelBackgroundColor(d.level)} inset`
    xpFill.style.width = `${calcXP(d.currentxp, d.nextxp)}%`;

    roleIconFrame.style.display = 'none';

    for (let i = 0, j = 0, c = 0; j < 7 && i < d.roles.length; i++) {
        const r = getRole(d.roles[i]);

        if (c == 0 && r.color) {
            const img = document.querySelector('#img-box img');
            displayName.style.color = nameColor(r.color);
            displayName.style.textShadow = `2px 2px ${backgroundColor(r.color)}`;

            roleIconFrame.style.borderColor = backgroundColor(r.color);
            roleIconFrame.style.backgroundColor = outlineColor(r.color);

            img.style.borderColor = backgroundColor(r.color);
            img.style.backgroundColor = outlineColor(r.color);

            c = 1;
        }

        if (r.url) {
            if (j == 0) {
                roleIcon.innerHTML = (r.url) ? roleImgElement(r.name, roleImgUrl(r), 128) : `<p>${r.name}</p>`;
                roleIconFrame.style.display = 'grid';
            }

            else {
                const x = document.createElement('span');
                x.innerHTML = roleImgElement(r.name, roleImgUrl(r), 32)
                rolesBox.appendChild(x);
            }

            j++;
        }
    }
}

(() => {
    const x = window.location.href.split('?')[1];

    if (x) {
        d.roles = [];
        x.split('&')?.forEach(i => {
            i = i.replace(/\+/g, ' ').split('=');

            if (i[1].includes('r%7C')) {
                const role = i[1].split('%7C')[1];
                const order = getRole(role).order;
                d.roles[order] = role;
            }
            else if (i[1]) d[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
        });

        d.roles = d.roles.flat()
    }

    setData()

    const toggleDm = (t = 0) => {
        if (t == 0) dm = (dm == 0) ? 1 : 0;
        document.documentElement.classList.toggle('lm', (dm == 1) ? false : true);
        document.documentElement.classList.toggle('dm', (dm == 1) ? true : false);
        localStorage.setItem('dm', JSON.stringify(dm));
    }

    let dm = JSON.parse(localStorage.getItem('dm')) ?? 1;

    document.getElementById('dm').addEventListener('click', () => toggleDm());

    toggleDm(1);
})();
