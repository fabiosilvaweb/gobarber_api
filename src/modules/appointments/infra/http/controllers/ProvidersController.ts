import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviderService = container.resolve(ListProvidersService);

    const providers = await listProviderService.execute(user_id);

    return response.json(providers);
  }
}

export default ProvidersController;
