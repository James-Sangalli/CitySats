import type { NextApiRequest, NextApiResponse } from 'next';
import { profile, setSession } from './userService';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return profile();
}

// @ts-ignore
export async function getServerSideProps(context) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    setSession(session);
    return {
        props: {
            session
        }
    };
}
