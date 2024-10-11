import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { base, faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('Mercado API', () => {
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://api-desafio-qa.onrender.com';

    let novoMercado;
    let novoDoce;
    let novoBovino;

    p.request.setDefaultTimeout(90000);

    describe('Mercado', () => {
        const userName = faker.string.alphanumeric(56)
        const cnpj = faker.string.numeric(14)
        const endereco = faker.location.streetAddress(true)

        beforeAll(async () => {
            p.reporter.add(rep);
    
            novoMercado = await p.spec().post(`${baseUrl}/mercado`).withJson({
                nome: userName,
                cnpj: cnpj,
                endereco: endereco
            }).expectStatus(StatusCodes.CREATED)
            .returns('novoMercado');
        })


        it('Cadastro de mercado',async () => {
            await p.spec().post(`${baseUrl}/mercado`).withJson({
                nome: faker.string.alphanumeric(50),
                cnpj: cnpj,
                endereco: endereco
            }).expectStatus(StatusCodes.CREATED)
        })

        it('Buscar um mercado por id',async () => {
            await p
            .spec()
            .get(`${baseUrl}/mercado/${novoMercado.id}`)
            .expectStatus(StatusCodes.OK)
            .expectJsonSchema({
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "properties": {
                  "cnpj": {
                    "type": "string"
                  },
                  "endereco": {
                    "type": "string"
                  },
                  "id": {
                    "type": "integer"
                  },
                  "nome": {
                    "type": "string"
                  }
                },
                "required": [
                  "cnpj",
                  "endereco",
                  "id",
                  "nome"
                ]
            })
        })

        it('Deletar um mercado', async () => {
            await p.spec()
            .delete(`${baseUrl}/mercado/${novoMercado.id}`)
            .expectStatus(StatusCodes.OK)
        })
    })

    describe('Doces', () => {
        beforeAll(async () => {
            p.reporter.add(rep);
    
            novoMercado = await p.spec().post(`${baseUrl}/mercado`).withJson({
                nome: faker.string.alpha(15),
                cnpj: faker.string.numeric(14),
                endereco: faker.word.words(3)
            }).expectStatus(StatusCodes.CREATED)
            .returns('novoMercado');
    
            novoDoce = await p.spec().post(`${baseUrl}/mercado/${novoMercado.id}/produtos/padaria/doces`).withJson({
                nome: faker.string.alpha(15),
                valor: faker.number.int(15)
            }).expectStatus(StatusCodes.CREATED)
            .returns('product_item');
        })


        it('Cadastro de doce',async () => {
            await p.spec().post(`${baseUrl}/mercado/${novoMercado.id}/produtos/padaria/doces`).withJson({
                nome: faker.string.alpha(15),
                valor: faker.number.int(15)
            }).expectStatus(StatusCodes.CREATED)
            .returns('product_item');
        })

        it('Buscar todos os doces',async () => {
            await p
            .spec()
            .get(`${baseUrl}/mercado/${novoMercado.id}/produtos/padaria/doces`)
            .expectStatus(StatusCodes.OK)
        })

        it('Deletar um doce', async () => {
            await p.spec()
            .delete(`${baseUrl}/mercado/${novoMercado.id}/produtos/padaria/doces/${novoDoce.id}`)
            .expectStatus(StatusCodes.OK)
        })
    })

    describe('Bovinos', () => {
        beforeAll(async () => {
            p.reporter.add(rep);
    
            novoMercado = await p.spec().post(`${baseUrl}/mercado`).withJson({
                nome: faker.string.alpha(15),
                cnpj: faker.string.numeric(14),
                endereco: faker.word.words(3)
            }).expectStatus(StatusCodes.CREATED)
            .returns('novoMercado');
    
            novoBovino = await p.spec().post(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/bovinos`)
            .withJson({
                nome: faker.string.alpha(15),
                valor: faker.number.int(15)
            }).expectStatus(StatusCodes.CREATED)
            .returns('product_item');
        })


        it('Cadastro de bovino',async () => {
            await p.spec().post(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/bovinos`).withJson({
                nome: faker.string.alpha(15),
                valor: faker.number.int(15)
            }).expectStatus(StatusCodes.CREATED)
            .returns('product_item');
        })

        it('Buscar todos os bovinos', async () => {
            await p
            .spec()
            .get(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/bovinos`)
            .expectStatus(StatusCodes.OK)
        });

        it('Deletar um bovino', async () => {
            await p.spec()
            .delete(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/bovinos/${novoBovino.id}`)
            .expectStatus(StatusCodes.OK)
        })
    })

    describe('Suinos', () => {
        let novoSuino;

        beforeAll(async () => {
            p.reporter.add(rep);
    
            novoMercado = await p.spec().post(`${baseUrl}/mercado`).withJson({
                nome: faker.string.alpha(15),
                cnpj: faker.string.numeric(14),
                endereco: faker.word.words(3)
            }).expectStatus(StatusCodes.CREATED)
            .returns('novoMercado');
    
            novoSuino = await p.spec().post(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/suinos`)
            .withJson({
                nome: faker.string.alpha(15),
                valor: faker.number.int(15)
            }).expectStatus(StatusCodes.CREATED)
            .returns('product_item');
        })


        it('Cadastro de suino',async () => {
            await p.spec().post(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/suinos`).withJson({
                nome: faker.string.alpha(15),
                valor: faker.number.int(15)
            }).expectStatus(StatusCodes.CREATED)
            .returns('product_item');
        })

        it('Buscar todos os suinos', async () => {
            await p
            .spec()
            .get(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/suinos`)
            .expectStatus(StatusCodes.OK)
        });

        it('Deletar um suino', async () => {
            await p.spec()
            .delete(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/bovinos/${novoSuino.id}`)
            .expectStatus(StatusCodes.OK)
        })
    })

    describe('Aves', () => {
        let novaAve;

        beforeAll(async () => {
            p.reporter.add(rep);
    
            novoMercado = await p.spec().post(`${baseUrl}/mercado`).withJson({
                nome: faker.string.alpha(15),
                cnpj: faker.string.numeric(14),
                endereco: faker.word.words(3)
            }).expectStatus(StatusCodes.CREATED)
            .returns('novoMercado');
    
            novaAve = await p.spec().post(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/aves`)
            .withJson({
                nome: faker.string.alpha(15),
                valor: faker.number.int(15)
            }).expectStatus(StatusCodes.CREATED)
            .returns('product_item');
        })


        it('Cadastro de ave',async () => {
            await p.spec().post(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/aves`).withJson({
                nome: faker.string.alpha(15),
                valor: faker.number.int(15)
            }).expectStatus(StatusCodes.CREATED)
            .returns('product_item');
        })

        it('Buscar todas as aves', async () => {
            await p
            .spec()
            .get(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/aves`)
            .expectStatus(StatusCodes.OK)
        });

        it('Deletar uma ave', async () => {
            await p.spec()
            .delete(`${baseUrl}/mercado/${novoMercado.id}/produtos/acougue/aves/${novaAve.id}`)
            .expectStatus(StatusCodes.OK)
        })
    })
})