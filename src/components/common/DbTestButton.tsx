"use client";

import { checkDatabaseConnection } from "@/lib/actions/db-test";

export default function DbTestButton() {
  async function testDatabase() {
    const result = await checkDatabaseConnection();

    console.log(result);
  }

  return <button onClick={testDatabase}>Test MongoDB</button>;
}
