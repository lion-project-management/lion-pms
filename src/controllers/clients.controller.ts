import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Client } from '../models';
import { ClientRepository } from '../repositories';

export class ClientsController {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
  ) { }

  @post('/clients', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Client) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {}),
        },
      },
    })
    client: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.clientRepository.create(client);
  }

  @get('/clients/count', {
    responses: {
      '200': {
        description: 'Client model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.clientRepository.count(where);
  }

  @get('/clients', {
    responses: {
      '200': {
        description: 'Array of Client model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Client) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Client)) filter?: Filter<Client>,
  ): Promise<Client[]> {
    return this.clientRepository.find(filter);
  }

  @patch('/clients', {
    responses: {
      '200': {
        description: 'Client PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, { partial: true }),
        },
      },
    })
    client: Client,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.clientRepository.updateAll(client, where);
  }

  @get('/clients/{id}', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Client) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Client> {
    return this.clientRepository.findById(id);
  }

  @patch('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, { partial: true }),
        },
      },
    })
    client: Client,
  ): Promise<void> {
    await this.clientRepository.updateById(id, client);
  }

  @put('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() client: Client,
  ): Promise<void> {
    await this.clientRepository.replaceById(id, client);
  }

  @del('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientRepository.deleteById(id);
  }
}