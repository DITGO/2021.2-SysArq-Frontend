import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import CreateShelfOrRack from "../../../pages/Fields/Create/CreateShelfOrRack";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { inputChange } from "./inputTest.test";
import { auth } from "../../support";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

const server = setupServer(
	auth(),
	rest.post(axiosArchives + `shelf/`, (req, res, ctx) => {
		if (req.body.number === "201") {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	}),
	rest.post(axiosArchives + `rack/`, (req, res, ctx) => {
		if (req.body.number === "201") {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.useFakeTimers();

const selectValue = (title) => {
	fireEvent.mouseDown(screen.getByLabelText("Selecione"));
	const subjectsOptions = within(screen.getByRole("listbox"));
	fireEvent.click(subjectsOptions.getByText(title));
};

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateShelfOrRack />);

		expect(
			screen.getByText("Cadastrar estantes e prateleiras")
		).toBeInTheDocument();
	});
});

const testEvent = async (object, findTextMsg) => {
	render(<CreateShelfOrRack />);
	selectValue(object[0]);
	inputChange(object[1], object[2]);
	fireEvent.click(screen.getByTestId("click"));
	await screen.findByText(findTextMsg);
	act(() => {
		jest.advanceTimersByTime(3000);
	});
};

describe("inputs", () => {
	it("axios sucess rack", async () => {
		const sucessRak = ["Prateleira", "Número da prateleira*", "201"];
		await testEvent(sucessRak, "Prateleira cadastrada!");
	});
	it("axios sucess shelf", async () => {
		const sucessShelf = ["Estante", "Número da estante*", "201"];
		await testEvent(sucessShelf, "Estante cadastrada!");
	});
	it("axios fail rack", async () => {
		const failRack = ["Prateleira", "Número da prateleira*", "401"];
		await testEvent(
			failRack,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
	it("axios fail shelf", async () => {
		const failShelf = ["Estante", "Número da estante*", "401"];
		await testEvent(
			failShelf,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
	it("empty shelf", async () => {
		const failShelf = ["Estante", "Número da estante*", ""];
		await testEvent(failShelf, "Estante não pode ser vazia");
	});
	it("empty rack", async () => {
		const failRack = ["Prateleira", "Número da prateleira*", ""];
		await testEvent(failRack, "Prateleira não pode ser vazia");
	});
	it("localstorage shelf", async () => {
		const successShelf = ["Estante", "Número da estante*", "32"];
		localStorage.setItem("tkr", 401);
		await testEvent(successShelf, "Cadastrar estantes e prateleiras");
	});
	it("localstorage2 shelf", async () => {
		const successShelf = ["Estante", "Número da estante*", "401"];
		localStorage.setItem("tkr", 404);
		await testEvent(
			successShelf,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
	it("localstorage rack", async () => {
		const sucessRak = ["Prateleira", "Número da prateleira*", "32"];
		localStorage.setItem("tkr", 401);
		await testEvent(sucessRak, "Cadastrar estantes e prateleiras");
	});
	it("localstorage2 rack", async () => {
		const sucessRak = ["Prateleira", "Número da prateleira*", "401"];
		localStorage.setItem("tkr", 404);
		await testEvent(
			sucessRak,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
});
