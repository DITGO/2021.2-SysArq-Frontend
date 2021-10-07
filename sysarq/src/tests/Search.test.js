import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import Search from "../pages/Search";

describe("Main component", () => {
	it("Show page components", () => {
		render(<Search />);
		expect(
			screen.getByText("Arquivo Geral da Polícia Civil do Goiás")
		).toBeInTheDocument();
		expect(screen.getByAltText("Logo")).toBeInTheDocument();
		expect(screen.getByText("Filtrar por:")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Pesquisar")).toBeInTheDocument();
	});
});

describe("Ensure that is receiving inputs form select and textfield", () => {
	it("Url Generation", () => {
		render(<Search />);

		expect(screen.getByTestId("InputBox"));

		const InputBox = screen.getByTestId("InputBox");
		fireEvent.change(InputBox, {
			target: { value: "1" },
		});

		const FilterSelect = screen.getByTestId("FilterSelect");
		fireEvent.change(FilterSelect, {
			target: { value: "process_number" },
		});
	});
});

describe("Test onClick of status type searches", () => {
	it("onClickStatus test", () => {
		render(<Search />);

		const FilterSelect = screen.getByTestId("FilterSelect");
		fireEvent.change(FilterSelect, {
			target: { value: "is_filed/true" },
		});
		expect(screen.getByText("Arquivado")).toBeInTheDocument();
	});
});

const testSelect = (value) => {
	render(<Search />);
	const InputBox = screen.getByTestId("InputBox");
	fireEvent.change(InputBox, {
		target: { value: "asd" },
	});

	fireEvent.mouseDown(screen.getByLabelText("Filtrar por:"));
	const subjectsOptions = within(screen.getByRole("listbox"));
	fireEvent.click(subjectsOptions.getByText(value));

	fireEvent.click(screen.getByText("Ir"));
};

describe("Axios requests", () => {
	it("axios fail", async () => {
		render(<Search />);
		fireEvent.click(screen.getByText("Ir"));
		await screen.findByText("Pesquise por algum valor");
	});
	it("axios fail", async () => {
		render(<Search />);
		const InputBox = screen.getByTestId("InputBox");
		fireEvent.change(InputBox, {
			target: { value: "asd" },
		});
		fireEvent.click(screen.getByText("Ir"));
		await screen.findByText("Selecione algum filtro");
	});
	it("axios success", async () => {
		testSelect("Número de processo");
	});
	it("filed test", async () => {
		testSelect("Arquivado");
	});
	it("unfiled test", async () => {
		testSelect("Desarquivado");
	});
	it("eliminated test", async () => {
		testSelect("Eliminado");
	});
});
