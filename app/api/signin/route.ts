import { sql } from "@vercel/postgres"
import { signJwtAccessToken } from 'lib/jwt';
export async function POST(request: Request) {
  try {
    const { email, password }: any = await request.json();

    const query = `SELECT * FROM users WHERE email = '${email}'`;
    const res = await sql.query(query)

    const user = res?.rows?.[0];

    if (!user) {
      return new Response(JSON.stringify({ error: 'Email does not exist!'}), { status: 200 });
    }

    if ('password' in user && user.password !== password) {
      return new Response(JSON.stringify({ error: 'Incorrect Password!' }), { status: 200 });
    }

    const accessToken = signJwtAccessToken(user);

    const result = {
      ...user,
      accessToken,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}