const cp = require('child_process')
const fs = require('fs/promises')
const path = require('path')

;(async () => {
  const inquirer = await import('inquirer').then((m) => m.default)
  const baseFilesPath = path.join(__dirname, 'base')
  const outputFilesPath = process.cwd()

  console.log('\nš„ NODE-STARTER-CLI\n')

  const { install } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'install',
      message: `Project is going to be installed at "${outputFilesPath}", continue? š¤`,
    },
  ])

  if (!install) {
    console.log('\nšæ Wait, what? Nevermind...\n')
    process.exit(1)
  }

  console.log('\n[1/2]\tš Copying files...')

  await fs.cp(baseFilesPath, outputFilesPath, {
    recursive: true,
  })

  // Install packages
  console.log('[2/2]\tš¦ Installing packages...')

  cp.spawnSync('npm', ['install'], {
    cwd: outputFilesPath,
  })

  console.log('\nš Done! Packages are already installed, you are ready to go!')
  console.log('\nš» Commands:')
  console.log('\t$ npm run dev\t\tStarts the development server')
  console.log('\t$ npm run build\t\tBuilds the application for production')
  console.log(
    '\t$ npm run start\t\tRun the build version of the app (requires the build command)\n'
  )
})()
