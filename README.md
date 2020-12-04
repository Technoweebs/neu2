[![Contributors][contributors-shield]][contributors-url]
[![Commits][commits-shield]][commits-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GPL-3.0 License][license-shield]][license-url]
[contributors-shield]: https://img.shields.io/github/contributors/TomaruDev/neu2.svg?style=for-the-badge
[contributors-url]: https://github.com/TomaruDev/neu2/graphs/contributors
[commits-shield]: https://img.shields.io/github/commit-activity/m/TomaruDev/neu2?style=for-the-badge
[commits-url]: https://github.com/TomaruDev/neu2/graphs/commit-activity
[stars-shield]: https://img.shields.io/github/stars/TomaruDev/neu2.svg?style=for-the-badge
[stars-url]: https://github.com/TomaruDev/neu2/stargazers
[issues-shield]: https://img.shields.io/github/issues/TomaruDev/neu2.svg?style=for-the-badge
[issues-url]: https://github.com/TomaruDev/neu2/issues
[license-shield]: https://img.shields.io/github/license/TomaruDev/neu2.svg?style=for-the-badge
[license-url]: https://github.com/TomaruDev/neu2/blob/master/LICENSE.md

<p align="center">
  <a href="https://github.com/TomaruDev/neu2/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/TomaruDev/neu2.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/TomaruDev/neu2/graphs/commit-activity">
    <img src="https://img.shields.io/github/commit-activity/m/TomaruDev/neu2?style=for-the-badge">
  </a>
  <a href="https://github.com/TomaruDev/neu2/stargazers">
    <img src="https://img.shields.io/github/stars/TomaruDev/neu2.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/TomaruDev/neu2/issues">
    <img src="https://img.shields.io/github/issues/TomaruDev/neu2.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/TomaruDev/neu2/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/TomaruDev/neu2.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/TomaruDev/neu2">
    <img src="assets/neu2.gif" alt="Logo" width="300" height="150">
  </a>

  <h3 align="center">Neu2</h3>

  <p align="center">
    My personal rework of the <a href="https://neutralino.js.org"><strong>NeutralinoJS</strong></a> client, which add and patch many functions, and make creating a Neutralino app better and easier.
    <br />
    <br />
    <a href="https://github.com/TomaruDev/neu2">Explore the docs</a>
    ·
    <a href="https://github.com/TomaruDev/neu2/issues">Report Bug</a>
    ·
    <a href="https://github.com/TomaruDev/neu2/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
	  	<li><a href="#whats-that">What's that ?</a></li>
		<li><a href="#why">Why ?</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
    	<li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#todo-list">ToDo List</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project
### What's that ?
This is Neu2, my rework of [*neu-cli*](https://github.com/neutralinojs/neutralinojs-cli), to allow devs to create a NeutralinoJS app faster and easier.

### Why ?
Because I had a bad experience with [neu-cli](https://github.com/neutralinojs/neutralinojs-cli), and I had nothing to do. So I threw myself into this little challenge, hoping it would make some people happy!

### Built With
* [NodeJS](https://nodejs.org/)
* [Yarn (the best Node.JS package manager 😇)](https://yarnpkg.com/)
* [A lot of packages 😏](https://github.com/TomaruDev/neu2/blob/main/package.json)

## Getting Started
### Prerequisites
This project was coded with NodeJS 14 on Linux (Manjaro).
It hasn't been tested yet on Windows and MacOS (but that shouldn't be a problem).

It has been somewhat tested on NodeJS 12, the older versions not being used much anymore, I don't think it will be a problem either. However, I'm waiting for your feedback!

### Installation
(The project is not yet published on NPM. To test, you must use git. I'm sorry for that!)
1. Download the project with...
   * ... NPM:
     ```bash
     npm install -g neu2
     ```
   * ... Yarn:
     ```bash
     yarn global add neu2
     ```
   * ... Git:
     ```bash
     git clone https://github.com/TomaruDev/neu2.git
     ```
2. If Git is used, you have to install the project with...
   * ... NPM:
     ```bash
     npm install
	 npm link
     ```
   * ... Yarn:
     ```bash
     yarn install
	 yarn link
     ```

### Usage
For the moment, the documentation in the `README.md` is not yet available. It will be coming soon!

In the meantime, you can still use the command line doc. Just type :
```bash
neu2 help
```
once Neu2 is installed on your computer.

## ToDo List
  * Code the Release Command
  * Finish the README
  * Add a Plugin System
  * Fix bugs 🐞

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the GPL-3.0 License. See `LICENSE.md` for more information.

## Contact
TomaruDev - [@MrTomaru](https://twitter.com/MrTomaru) - contact@tomaru.dev

Project Link: [https://github.com/TomaruDev/neu2](https://github.com/TomaruDev/neu2)

## Acknowledgements
Thanks to the devs of NeutralinosJS for creating... *NeutralinoJS* !