import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import CreateInterestInput from './dto/createInterest.input';
import InterestsArgs from './dto/interests.args';

import Interest from './models/interest';

@Injectable()
export default class InterestsService {
  private readonly interests: Interest[] = [
    {
      id: '4246ec53-6eaf-4744-93ce-e2643263d84b',
      title: 'Javascript',
    },
    {
      id: '65874b8b-844f-4664-ac5d-5b7d9edd16e6',
      title: 'GraphQL',
    },
    {
      id: '58659c67-2393-41d6-a803-94a8e9aa664f',
      title: 'Typescript',
    },
  ];

  async create(data: CreateInterestInput): Promise<Interest> {
    const interest: Interest = {
      id: uuidv4(),
      ...data,
    };
    this.interests.push(interest);
    return interest;
  }

  async findOneById(id: string): Promise<Interest> {
    return this.interests.find((u) => u.id === id);
  }

  async findAll(interestsArgs: InterestsArgs): Promise<Interest[]> {
    const { skip, take, interestIds } = interestsArgs;

    if (!interestIds) {
      return this.interests.slice(skip, skip + take);
    }

    if (!interestIds.length) {
      return [];
    }

    return this
      .interests
      .filter((x) => !interestIds || interestIds.includes(x.id))
      .slice(skip, skip + take);
  }

  async remove(id: string): Promise<boolean> {
    this.interests.splice(this.interests.findIndex((u) => u.id === id), 1);
    return true;
  }
}
