const { version } = require("../package.json");
const ethereum = require("./tokens/ethereum.json");
const ropsten = require("./tokens/ropsten.json");
const goerli = require("./tokens/goerli.json");
const nahmii2 = require("./tokens/nahmii2.json");
const nahmii2_testnet = require("./tokens/nahmii2_testnet.json");
const nahmii3_testnet = require("./tokens/nahmii3_testnet.json");
const { getAddress } = require("@ethersproject/address");

module.exports = function buildList() {
    const parsed = version.split(".");
    const list = {
        name: "Nahmii token list",
        timestamp: new Date().toISOString(),
        version: {
            major: +parsed[0],
            minor: +parsed[1],
            patch: +parsed[2],
        },
        tags: {},
        logoURI:
            "https://ipfs.io/ipfs/QmZiMZuShJtZ9pigejjdwHq2iyQTQiaVP4QXGtwt22gkPJ",
        keywords: ["nahmii", "tokenlist"],
        tokens: [
            ...ethereum,
            ...nahmii2,
            ...ropsten,
            ...nahmii2_testnet,
            ...goerli,
            ...nahmii3_testnet,
        ]
            .map((token) => ({ ...token, address: getAddress(token.address) }))
            .sort((t1, t2) => {
                if (t1.chainId === t2.chainId) {
                    return t1.symbol.toLowerCase() < t2.symbol.toLowerCase()
                        ? -1
                        : 1;
                }
                return t1.chainId < t2.chainId ? -1 : 1;
            }),
    };
    return list;
};
