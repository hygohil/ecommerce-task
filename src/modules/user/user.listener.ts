import { Injectable } from '@nestjs/common';

import { AuthHelpers } from '../../shared/helpers/auth.helpers';

@Injectable()
export class UserListener {
  static async onCreated(params, next) {
    const password = params?.args['data']?.password;

    // Check incoming query type
    if (params.model == 'User' && password) {
      if (params.action === 'create' || params.action === 'update') {
        const encryptedPass = await AuthHelpers.hash(password);

        params.args['data'] = {
          ...params.args['data'],
          password: encryptedPass,
        };
      }
    }

    return next(params);
  }
}
