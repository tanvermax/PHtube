function getTimesetup(time) {
    const hour = parseInt(time / 3600);
    let seconde = time % 3600;
    const minute = parseInt(seconde / 60);
    seconde = seconde%60;
    return `${hour} hour ${minute} minute ${seconde} seconde ago`;
}

console.log(getTimesetup(7865));


