// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CertiChain {
    address public owner; // The person who deployed the contract

    struct Certificate {
        string studentName;
        string course;
        string issuer;
        string issueDate;
    }

    uint public certificateCount;
    mapping(uint => Certificate) public certificates;

    // This runs once when you deploy
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict access
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the authorized issuer can perform this action");
        _;
    }

    function issueCertificate(
        string memory studentName,
        string memory course,
        string memory issuer,
        string memory issueDate
    ) public onlyOwner { // Added onlyOwner here
        certificateCount++;
        certificates[certificateCount] = Certificate(
            studentName,
            course,
            issuer,
            issueDate
        );
    }

    // verifyCertificate remains public so anyone can check validity
    function verifyCertificate(uint id)
        public
        view
        returns(string memory, string memory, string memory, string memory)
    {
        Certificate memory cert = certificates[id];
        return (cert.studentName, cert.course, cert.issuer, cert.issueDate);
    }
}