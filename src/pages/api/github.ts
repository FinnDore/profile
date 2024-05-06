import type { NextApiResponse } from 'next';
import { env } from '../../env/server.mjs';

const query = `
query($userName:String!) {
  user(login: $userName){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

async function retrieveContributionData(
    userName: string
): Promise<GithubResponse> {
    const variables = `
  {
    "userName": "${userName}"
  }
`;
    const body = {
        query,
        variables,
    };
    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify(body),
        next: {
            revalidate: 60 * 15,
        },
    });
    return res.json();
}

export default async function handler(req: Request, res: NextApiResponse) {
    const response = await retrieveContributionData('finndore');
    const cal = response.data.user.contributionsCollection.contributionCalendar;

    const contributions = cal.weeks.flatMap((week) => week.contributionDays);

    res.json(
        contributions.splice(contributions.length - 36, contributions.length)
    );
}

export interface GithubResponse {
    data: Data;
}

export interface Data {
    user: User;
}

export interface User {
    contributionsCollection: ContributionsCollection;
}

export interface ContributionsCollection {
    contributionCalendar: ContributionCalendar;
}

export interface ContributionCalendar {
    totalContributions: number;
    weeks: Week[];
}

export interface Week {
    contributionDays: ContributionDay[];
}

export interface ContributionDay {
    contributionCount: number;
    date: string;
}
