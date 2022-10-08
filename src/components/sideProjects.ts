type SideProject = {
  name: string;
  icon: string;
  link: string;
  desc: string;
  cover: string;
  shortcut: string;
}

export const sideProjects: SideProject[] = [
  {
    name: 'MHR tips',
    icon: 'https://github.com/unickhow/MHR-tips/blob/main/public/magnamalo.png?raw=true',
    link: 'https://unickhow.github.io/MHR-tips/',
    desc: 'Reproduce Monster Hunter loading animation.',
    cover: 'https://cdn.akamai.steamstatic.com/steam/apps/1446780/ss_f8249da14987e3c2d10fd4024736f28774c713da.1920x1080.jpg?t=1656320720',
    shortcut: 'm'
  },
  {
    name: 'knowme',
    icon: 'https://raw.githubusercontent.com/unickhow/knowme/main/public/favicon.svg',
    link: 'https://knowme.unick.how',
    desc: 'GitHub README card generator.',
    cover: 'https://images.unsplash.com/photo-1591608516485-a1a53df39498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    shortcut: 'k'
  },
  {
    name: 'vvalai',
    icon: 'https://raw.githubusercontent.com/unickhow/vvalai/main/public/favicon.ico',
    link: 'https://vvalai.unick.how',
    desc: 'Vue 3 starter template in typescript.',
    cover: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    shortcut: 'v'
  },
  {
    name: 'twinterfell',
    icon: 'https://raw.githubusercontent.com/unickhow/twinterfell/main/public/favicon.svg',
    link: 'https://twinterfell.unick.how',
    desc: 'Taiwan landmarks touring in GOT style.',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    shortcut: 't'
  }
]