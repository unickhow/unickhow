import type { SideProject } from '~/types'

export const sideProjects: SideProject[] = [
  {
    name: 'Slope',
    plainName: 'Slope',
    icon: 'https://www.figma.com/community/plugin/978200655090799378/icon',
    link: 'https://www.figma.com/community/plugin/978200655090799378/Slope',
    desc: 'Continuous string generator for Figma.',
    cover: 'https://hackmd.io/_uploads/rJgcrXB42.png',
    color: '#e6564c',
    screens: [
      '/projectScreens/slope-1.gif',
      '/projectScreens/slope-2.gif',
      ''
    ],
    shortcut: 's'
  },
  {
    name: 'Jirassic',
    plainName: 'Jirassic',
    icon: 'https://user-images.githubusercontent.com/22793771/208934842-8201a15a-45a0-4274-bdbf-55a3d4f40eb2.png',
    link: 'https://github.com/unickhow/jirassic',
    desc: 'GitHub PR integration for Jira.',
    cover: 'https://hackmd.io/_uploads/HyoQY8c8h.png',
    color: '#f7b600',
    screens: [
      '/projectScreens/jirassic-1.gif',
      '/projectScreens/jirassic-2.gif',
      '/projectScreens/jirassic-3.gif'
    ],
    shortcut: 'j'
  },
  {
    name: 'Nestination',
    plainName: 'Nestination',
    icon: 'https://raw.githubusercontent.com/unickhow/nestination/main/images/icon.png',
    link: 'https://marketplace.visualstudio.com/items?itemName=unickhow.nestination',
    desc: 'VSCode extension for finding targets in nested content.',
    cover: '',
    color: '#5D5FEF',
    screens: [
      '',
      'https://github.com/unickhow/nestination/assets/22793771/9bf991a6-71d4-47a0-b2aa-1a5c283b2675',
      ''
    ],
    shortcut: 'n'
  },
  {
    name: 'Space guardian',
    plainName: 'Space guardian',
    icon: 'https://raw.githubusercontent.com/unickhow/space-guardian/main/images/icon.png',
    link: 'https://marketplace.visualstudio.com/items?itemName=unickhow.space-guardian',
    desc: 'VSCode extension for managing spacing between Chinese and English.',
    cover: '',
    color: '#FF9E58',
    screens: [
      'https://github.com/unickhow/space-guardian/assets/22793771/6781c3c4-dfc0-4728-ac1e-44d29c4b783f',
      '',
      ''
    ],
    shortcut: 'g'
  },
  {
    name: 'Zhuyin convertor',
    plainName: 'Zhuyin convertor',
    icon: 'https://github.com/unickhow/zhuyin-convertor/blob/main/public/icon-zhuyin.png?raw=true',
    link: 'https://zhuyin.unick.how/',
    desc: 'Convert Chinese characters to Zhuyin (Bopomofo)',
    cover: '',
    color: '#466B7E',
    screens: [
      '/projectScreens/zhuyin-1.gif',
      '/projectScreens/zhuyin-2.gif',
      ''
    ],
    shortcut: 'z'
  }
]
