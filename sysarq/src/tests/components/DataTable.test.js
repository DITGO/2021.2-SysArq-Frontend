import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, within } from "@testing-library/react";

import DataTable from "../../pages/components/DataTable";

const axiosArchives = process.env.REACT_APP_URL_API_ARCHIVES;
const axiosProfile = process.env.REACT_APP_URL_API_PROFILE;

const server = setupServer(
	rest.post(`${axiosProfile}api/token/refresh/`, (req, res, ctx) => {
		if (req.body.refresh === localStorage.getItem("tkr")) {
			return res(ctx.status(200));
		} else {
			return res(ctx.status(404));
		}
	}),
	rest.get(`${axiosArchives}document-subject/`, async (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 1,
					subject_name: "a-document-subject-test",
					temporality: "2021-09-18",
				},
				{
					id: 2,
					subject_name: "document-subject-test1",
					temporality: "2021-09-19",
				},
				{
					id: 3,
					subject_name: "document-subject-test2",
					temporality: "2021-09-20",
				},
				{
					id: 4,
					subject_name: "document-subject-test3",
					temporality: "2021-09-21",
				},
				{
					id: 5,
					subject_name: "document-subject-test4",
					temporality: "2021-09-22",
				},
				{
					id: 6,
					subject_name: "document-subject-test5",
					temporality: "2021-09-23",
				},
				{
					id: 7,
					subject_name: "document-subject-test6",
					temporality: "2021-09-24",
				},
				{
					id: 8,
					subject_name: "document-subject-test7",
					temporality: "2021-09-25",
				},
				{
					id: 9,
					subject_name: "document-subject-test8",
					temporality: "2021-09-26",
				},
				{
					id: 10,
					subject_name: "document-subject-test9",
					temporality: "2021-09-27",
				},
				{
					id: 11,
					subject_name: "document-subject-test10",
					temporality: "2021-09-28",
				},
				{
					id: 12,
					subject_name: "z-document-subject-test",
					temporality: "2021-09-29",
				},
			])
		);
	}),

	rest.get(`${axiosArchives}box-abbreviation/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	}),
	rest.get(`${axiosArchives}search/`, async (req, res, ctx) => {
		const value = req.url.searchParams.get("filter");
		if (value === '{"process_number":"111"}') {
			return res(
				ctx.json({
					box_archiving: [],
					frequecy_relation: [],
					frequency_sheet: [],
					administrative_process: [
						{
							id: 5,
							process_number: "111",
							notes: "",
							filer_user: "filer_user",
							notice_date: "2021-10-01",
							interested: "paulao",
							cpf_cnpj: "",
							reference_month_year: "2021-10-01",
							sender_user: "",
							archiving_date: "2021-10-01",
							is_filed: true,
							is_eliminated: false,
							send_date: null,
							administrative_process_number: "",
							sender_unity: 1,
							abbreviation_name: "babababa",
							subject_id: 1,
							dest_unity_id: 1,
							unity_id: null,
							shelf_number: 3,
							rack_number: 2,
							abbreviation_id: 2,
							shelf_id: 1,
							rack_id: 1,
						},
					],
				})
			);
		} else {
			return res(
				ctx.json({
					box_archiving: [],
					frequecy_relation: [],
					frequency_sheet: [],
					administrative_process: [
						{
							id: 5,
							process_number: "222",
							notes: "",
							filer_user: "filer_user",
							notice_date: "2021-10-01",
							interested: "paulao",
							cpf_cnpj: "",
							reference_month_year: "2021-10-01",
							sender_user: "",
							archiving_date: "2021-10-01",
							is_filed: false,
							is_eliminated: true,
							send_date: null,
							administrative_process_number: "",
							sender_unity: 1,
							abbreviation_name: "babababa",
							subject_id: 1,
							dest_unity_id: 1,
							unity_id: null,
							shelf_number: 3,
							rack_number: 2,
							abbreviation_id: 2,
							shelf_id: 1,
							rack_id: 1,
						},
					],
				})
			);
		}
	}),

	rest.get(`${axiosArchives}unity/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	}),

	rest.get(`${axiosArchives}document-type/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	}),

	rest.get(`${axiosArchives}shelf/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	}),

	rest.get(`${axiosArchives}status/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("DataTable and tablesHeadCells Test", () => {
	it("test components flow", async () => {
		render(<DataTable title="Assunto do documento" url="document-subject/" />);

		expect(screen.getByText("Nome do Assunto")).toBeInTheDocument();
		expect(screen.getByText("Temporalidade")).toBeInTheDocument();

		await screen.findByText("a-document-subject-test");

		fireEvent.click(screen.getByText("Nome do Assunto"));

		expect(screen.getByText("a-document-subject-test")).toBeInTheDocument();
		expect(
			screen.queryByText("z-document-subject-test")
		).not.toBeInTheDocument();

		fireEvent.click(screen.getByText("Nome do Assunto"));

		expect(screen.getByText("z-document-subject-test")).toBeInTheDocument();
		expect(
			screen.queryByText("a-document-subject-test")
		).not.toBeInTheDocument();

		expect(
			screen.getByRole("button", { name: /Previous page/ })
		).toBeDisabled();
		expect(
			screen.getByRole("button", { name: /Next page/ })
		).not.toBeDisabled();

		fireEvent.click(screen.getByRole("button", { name: /Next page/ }));

		expect(screen.getByRole("button", { name: /Next page/ })).toBeDisabled();
		expect(
			screen.getByRole("button", { name: /Previous page/ })
		).not.toBeDisabled();

		fireEvent.mouseDown(screen.getByRole("button", { name: /10/ }));
		const listbox = within(screen.getByRole("listbox"));
		fireEvent.click(listbox.getByText(/25/i));

		expect(screen.getByRole("button", { name: /25/ })).toHaveTextContent("25");
	});

	it("test box abrreviation table head cells", async () => {
		render(<DataTable title="Sigla da Caixa" url="box-abbreviation/" />);

		expect(screen.getByText("Número")).toBeInTheDocument();
		expect(screen.getByText("Sigla")).toBeInTheDocument();
		expect(screen.getByText("Nome")).toBeInTheDocument();
		expect(screen.getByText("Ano")).toBeInTheDocument();
	});

	it("test unity table head cells", async () => {
		render(<DataTable title="Unidade" url="unity/" />);

		expect(screen.getByText("Nome da Unidade")).toBeInTheDocument();
		expect(screen.getByText("Sigla da Unidade")).toBeInTheDocument();
		expect(screen.getByText("Vínculo Administrativo")).toBeInTheDocument();
		expect(screen.getByText("Sigla do Vínculo")).toBeInTheDocument();
		expect(screen.getByText("Município")).toBeInTheDocument();
		expect(screen.getByText("Telefone")).toBeInTheDocument();
		expect(screen.getByText("Observações")).toBeInTheDocument();
	});

	it("test document type table head cells", async () => {
		render(<DataTable title="Tipo de Documento" url="document-type/" />);

		expect(screen.getByText("Nome do Documento")).toBeInTheDocument();
		expect(screen.getByText("Temporalidade")).toBeInTheDocument();
	});

	it("test shelf table head cells", async () => {
		render(<DataTable title="Estante e Prateleira" url="shelf/" />);

		expect(screen.getByText("Número de Estante")).toBeInTheDocument();
	});

	it("test public worker table head cells", async () => {
		render(<DataTable title="Servidor" url="public-worker/" />);

		expect(screen.getByText("Nome")).toBeInTheDocument();
		expect(screen.getByText("CPF")).toBeInTheDocument();
		expect(screen.getByText("Cargo")).toBeInTheDocument();
		expect(screen.getByText("Classe")).toBeInTheDocument();
		expect(screen.getByText("Unidade")).toBeInTheDocument();
		expect(screen.getByText("Municipio")).toBeInTheDocument();
	});

	it("test is_filed", async () => {
		render(
			<DataTable
				title="Resultado da Pesquisa"
				url="search/?filter=%7B%22process_number%22:%22111%22%7D"
			/>
		);
		await screen.findByText("111");
		expect(screen.getByText("Sim")).toBeInTheDocument();
		expect(screen.getByText("Não")).toBeInTheDocument();
	});
	it("test is_eliminated", async () => {
		render(
			<DataTable
				title="Resultado da Pesquisa"
				url="search/?filter=%7B%22process_number%22:%22222%22%7D"
			/>
		);
		await screen.findByText("222");
		expect(screen.getByText("Sim")).toBeInTheDocument();
		expect(screen.getByText("Não")).toBeInTheDocument();
	});
});
