import { getNavigationLinks } from '../models/index.js';
 
const getNav = async () => {
    const links = await getNavigationLinks();
    let nav = '<nav><ul>';
    links.forEach((linkInfo) => {
        nav += `<li><a href="${linkInfo.route}">${linkInfo.name}</a></li>`
    });
    return `${nav}</ul></nav>`;
};
 
export { getNav };