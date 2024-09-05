import 'dart:convert';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart' as http;

class BlockchainService {
  final String rpcUrl = 'http://127.0.0.1:7545'; // URL of your Ethereum node
  final String privateKey = '0xca36033541848b63914d1ec69025b207c266abd00ad968c0cd661dcb92c687f6'; // Your Ethereum account private key
  late Web3Client client;
  late Credentials credentials;
  late DeployedContract contract;
  late ContractFunction checkInFunction;
  late ContractFunction checkOutFunction;

  BlockchainService() {
    _initialize();
  }

  Future<void> _initialize() async {
    client = Web3Client(rpcUrl, http.Client());
    credentials = EthPrivateKey.fromHex(privateKey);
    await loadContract();  // Ensure the contract is loaded before using it
  }

  Future<void> loadContract() async {
    final abi = [
      {
        "inputs": [
          {"internalType": "address", "name": "", "type": "address"},
          {"internalType": "uint256", "name": "", "type": "uint256"}
        ],
        "name": "attendanceRecords",
        "outputs": [
          {"internalType": "uint256", "name": "checkInTime", "type": "uint256"},
          {"internalType": "uint256", "name": "checkOutTime", "type": "uint256"},
          {"internalType": "address", "name": "employee", "type": "address"},
          {"internalType": "string", "name": "location", "type": "string"}
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "string", "name": "location", "type": "string"}],
        "name": "checkIn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "checkOut",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    final contractAddress = EthereumAddress.fromHex('0x07dA9A71208b25bF20cfA66815c4BBcc1F4fe184'); // Replace with your contract address
    contract = DeployedContract(
      ContractAbi.fromJson(jsonEncode(abi), 'Attendance'),
      contractAddress,
    );
    checkInFunction = contract.function('checkIn');
    checkOutFunction = contract.function('checkOut');
  }

  Future<void> checkIn(String location) async {
    final tx = Transaction.callContract(
      contract: contract,
      function: checkInFunction,
      parameters: [location],
    );
    await client.sendTransaction(
      credentials,
      tx,
      chainId: null, // Use null for auto-fetching chainId
    );
  }

  Future<void> checkOut() async {
    final tx = Transaction.callContract(
      contract: contract,
      function: checkOutFunction,
      parameters: [],
    );
    await client.sendTransaction(
      credentials,
      tx,
      chainId: 1234, // Use null for auto-fetching chainId
    );
  }
}
