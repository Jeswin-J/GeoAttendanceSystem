pragma solidity ^0.8.0;

contract Attendance {
    struct CheckInOut {
        uint256 checkInTime;
        uint256 checkOutTime;
        address employee;
        string location;
    }

    mapping(address => CheckInOut[]) public attendanceRecords;

    function checkIn(string memory location) public {
        CheckInOut memory record = CheckInOut({
            checkInTime: block.timestamp,
            checkOutTime: 0,
            employee: msg.sender,
            location: location
        });
        attendanceRecords[msg.sender].push(record);
    }

    function checkOut() public {
        CheckInOut[] storage records = attendanceRecords[msg.sender];
        require(records.length > 0, "No check-in record found");
        CheckInOut storage lastRecord = records[records.length - 1];
        require(lastRecord.checkOutTime == 0, "Already checked out");
        lastRecord.checkOutTime = block.timestamp;
    }
}
