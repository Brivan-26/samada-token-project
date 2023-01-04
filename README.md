# Samada Token (SDA) 

This repoisoty contains the project of **Samada Token**(**SDA**), alongisde a Faucet Contract

## Before starting, make sure:

- Create `.env` file and set:
  - `INFURA_GORLI_ENDPOINT` or feel free to set your custom etheruem endpoint(make sure to update the `./hardhat.config.js`)
  - `PRIVATE_KEY` of the wallet owner - *if case of deployment*-
  - Install dependencies: `npm install`

### Useful commands:

- `npx hardhat compile`: Compile the contracts
- `npx hardhat test`: Run the tests
- `npx hardhat node`: Run a local node (**localhost** network)
- `npx hardhat run --network localhost scripts/SamadaToken.js`: Deploy the Token contract to the local node__*make sure to launch the `npx hardhat node` command*


