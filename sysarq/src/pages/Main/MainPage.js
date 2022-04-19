import React from "react";



import MenuCard from "../components/MenuCard";
import CardContainer from "../components/Container/CardContainer";

import imgBox from "../assets/logo.png";

import "./MainPage.css";

export default function MainPage() {
	return (
		<body id="body">
			<section>
				<img id="logo" src={imgBox} alt="Logo" />
				<h1 id="search_title">Arquivo Geral da Polícia Civil de Goiás</h1>

				<CardContainer title="Documentos" spacing={2}>
					<MenuCard
						icon="administrative-process-icon"
						title="Processo Administrativo"
						url="/documents/administrative-process"						
						lg={4}
					/>						
					<MenuCard
						icon="frequency-relation-icon"
						title="Relação de Frequências"
						url="/documents/frequency-relation"
						lg={3}
					/>
					<MenuCard
						icon="frequency-sheet-icon"
						title="Folha de Frequências"
						url="/documents/frequency-sheet"
						lg={3}
					/>
					<MenuCard
						icon="box-archiving-icon"
						title="Arquivamento de Caixas"
						url="/documents/box-archiving"
						lg={3}
					/>
				</CardContainer>

				<CardContainer title="Campos Obrigatórios" spacing={2}>
					<MenuCard
						icon="document-name-icon"
						title="Nome do Documento"
						url="/fields/document-name"
						lg={3}
					/>
					<MenuCard
						icon="unit-icon"
						title="Unidade"
						url="/fields/unity"
						lg={3}
					/>
					<MenuCard
						icon="abbreviation-icon"
						title="Sigla da Caixa"
						url="/fields/box-abbreviation"
						lg={3}
					/>
					<MenuCard
						icon="shelf-rack-icon"
						title="Localidade do Documento"
						url="/fields/shelf"
						lg={3}
					/>
					<MenuCard
						icon="public-worker-icon"
						title="Servidor"
						url="/fields/public-worker"
						lg={3}
					/>
				</CardContainer>

				
			</section>
		</body>
	);
}