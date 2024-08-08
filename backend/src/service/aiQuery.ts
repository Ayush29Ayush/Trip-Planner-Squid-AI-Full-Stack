import {
  SquidService,
  secureDatabase,
  webhook,
  executable,
} from '@squidcloud/backend';

export class ExampleService extends SquidService {
  @secureDatabase('all', 'built_in_db')
  allowAccessToBuiltInDb(): boolean {
    return true;
  }
  // @webhook('resetCounter')
  // async resetCounter() {
  //   await this.squid.collection('count').doc('count').delete();
  // }

  @executable()
  async askQuestion(question: string): Promise<string> {
    const aiResponse = await this.squid
      .ai()
      .executeAiQuery('built_in_db', question);

    console.log(`
      Question: ${question}
      Query: ${aiResponse.executedQuery ?? 'No Query executed'}
      Explanation: ${aiResponse.explanation ?? 'No Explanation'}
      `);

    return aiResponse.answer;
  }
}
