type SideProject = {
  name: string;
  icon: string;
  link: string;
  desc: string;
  shortcut: string;
}

export const sideProjects: SideProject[] = [
  {
    name: 'MHR tips',
    icon: 'https://github.com/unickhow/MHR-tips/blob/main/public/magnamalo.png?raw=true',
    link: 'https://unickhow.github.io/mhr-tips',
    desc: 'reproduce Monster Hunter loading animation.',
    shortcut: 'm'
  },
  {
    name: 'knowme',
    icon: 'https://raw.githubusercontent.com/unickhow/knowme/main/public/favicon.svg',
    link: 'https://knowme.unick.how',
    desc: 'GitHub README card generator.',
    shortcut: 'k'
  },
  {
    name: 'vvalai',
    icon: 'https://raw.githubusercontent.com/unickhow/vvalai/main/public/favicon.ico',
    link: 'https://vvalai.unick.how',
    desc: 'Vue 3 starter template in typescript.',
    shortcut: 'v'
  },
  {
    name: 'twinterfell',
    icon: 'https://raw.githubusercontent.com/unickhow/twinterfell/main/public/favicon.svg',
    link: 'https://twinterfell.unick.how',
    desc: 'Taiwan landmarks touring in GOT style.',
    shortcut: 't'
  }
]