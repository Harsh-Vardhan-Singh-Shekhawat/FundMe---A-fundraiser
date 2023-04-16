/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    network:{
      hardhat: {},
      sepolia: {
        url: "https://eth-sepolia.g.alchemy.com/v2/8zzK1URAFTL2YZ2KodJWTsdZeG6oJSzD",
        accounts:[`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
