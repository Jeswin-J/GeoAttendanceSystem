import asyncio
import aiohttp
import time

URL = "http://192.168.29.111:8080/api/attendance/status/E2"
REQUESTS_PER_SECOND = 50000000

successful_requests = 0

async def make_request(session):
    global successful_requests
    try:
        async with session.get(URL) as response:
            print(f"{successful_requests} Request status: {response.status}")
            await response.text()
            successful_requests += 1
    except Exception as e:
        print(f"Request failed: {e}")

async def main():
    async with aiohttp.ClientSession() as session:
        tasks = []
        for i in range(REQUESTS_PER_SECOND):
            tasks.append(make_request(session))
            if len(tasks) >= 1000000: 
                await asyncio.gather(*tasks)
                tasks = []
        if tasks:
            await asyncio.gather(*tasks)

if __name__ == "__main__":
    start_time = time.time()
    asyncio.run(main())
    print(f"Total time: {time.time() - start_time:.2f} seconds")
    print(f"Total successful requests: {successful_requests}")
