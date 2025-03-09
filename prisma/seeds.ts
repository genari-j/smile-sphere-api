import { checkingDBToInsertSeeds } from '~/helpers/index'

async function execSeeds() {
	/* ------------------ STARTING ------------------ */
	console.table('Iniciando a inserção das seeds 😊')

	/* ------------------ PROFILES ------------------ */
	const profiles = [
		{
			name: 'Admin',
			description: 'Poderá executar todas operações do sistema',
		},
		{
			name: 'Gestor de área',
			description: 'Poderá visualizar todas informações e realizar novos cadastros',
		},
		{
			name: 'Funcionário',
			description: 'Poderá apenas visualizar todas informações',
		},
	]
	await checkingDBToInsertSeeds(profiles, 'profile', 'name')
	console.table('Perfis inseridos com sucesso.')

	/* ------------------ PROFILE PERMISSIONS ------------------ */
	const profilePermissions = [
		{
			code: 'ADM',
			description: 'Poderá executar todas operações do sistema',
			profiles: '1',
		},
		{
			code: 'GA',
			description: 'Poderá visualizar todas informações e realizar novos cadastros',
			profiles: '2',
		},
		{
			code: 'FUN',
			description: 'Poderá apenas visualizar todas informações',
			profiles: '3',
		},
	]
	await checkingDBToInsertSeeds(profilePermissions, 'profilePermission', 'code')
	console.table('Permissões dos perfis inseridas com sucesso.')

	/* ------------------ DEPARTMENTS ------------------ */
	const departments = [
		{ name: 'Recursos Humanos' },
		{ name: 'Segurança Corporativa' },
		{ name: 'Tecnologia da Informação' },
		{ name: 'Compliance' },
		{ name: 'Recursos Humanos' },
		{ name: 'Financeiro' },
		{ name: 'Marketing' },
	]
	await checkingDBToInsertSeeds(departments, 'department', 'name')
	console.table('Departamentos inseridos com sucesso.')

	/* ------------------ ADDRESSES ------------------ */
	const addresses = [
		{
			street: 'Av. Exemplo',
			number: 123,
			neighborhood: 'Jardim Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Est. Exemplo',
			number: 456,
			neighborhood: 'Vila Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Rua Exemplo',
			number: 789,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Av. Exemplo 1',
			number: 101112,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Est. Exemplo 1',
			number: 131415,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Rua Exemplo 1',
			number: 161718,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Av. Exemplo 2',
			number: 192021,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Est. Exemplo 2',
			number: 222324,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Av. Exemplo 3',
			number: 222324,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Rua Exemplo 2',
			number: 222324,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Est. Exemplo 3',
			number: 222324,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Av. Exemplo 4',
			number: 222324,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			street: 'Est. Exemplo 4',
			number: 222324,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
	]
	await checkingDBToInsertSeeds(addresses, 'addresses', 'street')
	console.table('Endereços inseridos com sucesso.')

	/* ------------------ USERS ------------------ */
	const users = [
		{
			name: 'Administrador',
			email: 'admin@hotmail.com',
			user_code: 'MHT51F',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11922225555',
			department_id: 1,
			address_id: 1,
			profile_id: 1,
		},
		{
			name: 'Gestor de Área',
			email: 'manager@hotmail.com',
			user_code: 'XHX82L',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11988889999',
			department_id: 2,
			address_id: 2,
			profile_id: 2,
		},
		{
			name: 'Funcionário',
			email: 'colaborator@hotmail.com',
			user_code: 'LDB41A',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11911113333',
			department_id: 3,
			address_id: 3,
			profile_id: 3,
		},
	]
	await checkingDBToInsertSeeds(users, 'user', 'user_code')
	console.table('Usuários inseridos com sucesso.')

	/* ------------------ SPECIALTIES ------------------ */
	const specialties = [
		{
			name: 'Ortodontia',
			description:
				'Focada no diagnóstico, prevenção e tratamento de irregularidades dentárias e faciais, geralmente com o uso de aparelhos.',
		},
		{
			name: 'Endodontia',
			description:
				'Especialidade que trata de doenças da polpa dental e dos tecidos periapicais, incluindo tratamentos de canal.',
		},
		{
			name: 'Periodontia',
			description:
				'Dedica-se ao estudo e tratamento das doenças que afetam as gengivas e os tecidos de suporte dos dentes.',
		},
		{
			name: 'Odontopediatria',
			description: 'Cuida da saúde bucal de crianças, abordando suas necessidades específicas.',
		},
		{
			name: 'Implantodontia',
			description: 'Especializada na colocação de implantes dentários para substituir dentes perdidos.',
		},
		{
			name: 'Prótese Dentária',
			description: 'Focada na restauração e substituição de dentes ausentes, utilizando próteses fixas ou removíveis.',
		},
		{
			name: 'Odontologia Estética',
			description:
				'Envolve procedimentos para melhorar a aparência dos dentes, como clareamento, facetas e restaurações estéticas.',
		},
		{
			name: 'Cirurgia Bucomaxilofacial',
			description:
				'Trata condições relacionadas à boca, mandíbula e face, incluindo extrações complexas e correções ortognáticas.',
		},
		{
			name: 'Radiologia Odontológica',
			description:
				'Especialidade que utiliza técnicas de imagem para auxiliar no diagnóstico e planejamento de tratamentos.',
		},
		{
			name: 'Patologia Bucal',
			description: 'Estuda e diagnostica doenças que afetam a cavidade bucal e estruturas relacionadas.',
		},
		{
			name: 'Dentística',
			description:
				'Focada em restaurações estéticas e funcionais, utilizando materiais que imitam a aparência natural dos dentes.',
		},
		{
			name: 'Terapia da Dor Orofacial',
			description: 'Especialidade que se concentra no diagnóstico e tratamento de dores na região da cabeça e pescoço.',
		},
	]
	await checkingDBToInsertSeeds(specialties, 'specialty', 'name')
	console.table('Especialidades dos Doutroes inseridas com sucesso.')

	/* ------------------ DOCTORS ------------------ */
	const doctors = [
		{
			name: 'Karoline de Oliveira Genari Chagas',
			email: 'genarirol@hotmail.com',
			user_code: 'BHT51F',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11922225555',
			specialtie_id: 1,
			address_id: 4,
			profile_id: 2,
		},
		{
			name: 'Fulano Beltrano Souza',
			email: 'fulano_beltrano_souza@hotmail.com',
			user_code: 'CHT51F',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11922225555',
			specialtie_id: 4,
			address_id: 5,
			profile_id: 2,
		},
		{
			name: 'Fulano Beltrano Silva',
			email: 'fulano_beltrano_silva@hotmail.com',
			user_code: 'HHT51F',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11922225555',
			specialtie_id: 8,
			address_id: 6,
			profile_id: 2,
		},
		{
			name: 'Beltrano Fulano Souza',
			email: 'beltrano_fulano_souza@hotmail.com',
			user_code: 'GHT51F',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11922225555',
			specialtie_id: 11,
			address_id: 7,
			profile_id: 2,
		},
		{
			name: 'Beltrano Fulano Silva',
			email: 'beltrano_fulano_silva@hotmail.com',
			user_code: 'LHT51F',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11922225555',
			specialtie_id: 12,
			address_id: 8,
			profile_id: 2,
		},
	]
	await checkingDBToInsertSeeds(doctors, 'doctor', 'user_code')
	console.table('Doutores inseridos com sucesso.')

	/* ------------------ PATIENTS TREATMENTS ------------------ */
	const patientsTreatments = [
		{
			name: 'Aparelho fixo (metálico ou estético)',
			description:
				'Aparelho ortodôntico fixado aos dentes para correção de maloclusões, utilizando braquetes metálicos ou cerâmicos.',
		},
		{
			name: 'Aparelho invisível (alinhadores)',
			description:
				'Alinhadores transparentes removíveis que ajudam a corrigir a posição dos dentes de maneira discreta.',
		},
		{
			name: 'Expansor palatino',
			description:
				'Aparelho utilizado para expandir o maxilar superior, corrigindo problemas de mordida cruzada e ampliando o espaço para os dentes.',
		},
		{
			name: 'Aparelho móvel',
			description:
				'Dispositivo removível usado para corrigir problemas menores de alinhamento dentário e para retenção após o uso de aparelho fixo.',
		},
		{
			name: 'Retenção ortodôntica',
			description:
				'Manutenção da posição dos dentes após o tratamento ortodôntico, utilizando contenções fixas ou removíveis.',
		},
		{
			name: 'Correção de mordida aberta, cruzada, profunda e outras maloclusões',
			description:
				'Ajustes no alinhamento dentário para corrigir problemas de mordida, como mordida aberta, cruzada ou profunda.',
		},
		{
			name: 'Ajuste ortodôntico e manutenção',
			description:
				'Procedimentos de ajustes periódicos no aparelho ortodôntico para garantir o progresso correto do tratamento.',
		},
		{
			name: 'Tratamento de canal',
			description:
				'Procedimento para tratar infecções ou inflamações na polpa dental, removendo o tecido afetado e selando o dente.',
		},
		{
			name: 'Retratamento endodôntico',
			description:
				'Realização de um novo tratamento de canal em casos em que o tratamento anterior falhou ou houve reinfecção.',
		},
		{
			name: 'Desobturação endodôntica',
			description:
				'Remoção do material de obturação de um canal radicular para retratamento ou correção do procedimento anterior.',
		},
		{
			name: 'Apicectomia',
			description:
				'Procedimento cirúrgico realizado para remover a ponta da raiz do dente, indicado quando o tratamento de canal não é eficaz.',
		},
		{
			name: 'Climatização endodôntica',
			description:
				'Técnica que consiste na desinfecção e limpeza do canal radicular com o objetivo de prevenir infecções.',
		},
		{
			name: 'Endodontia minimamente invasiva',
			description:
				'Abordagem que visa tratar a polpa dental com o mínimo de desgaste possível, utilizando técnicas avançadas e tecnologias.',
		},
		{
			name: 'Profilaxia periodontal (limpeza profissional)',
			description:
				'Limpeza dental profunda para remover placa bacteriana e tártaro, ajudando na prevenção de doenças gengivais.',
		},
		{
			name: 'Curetagem subgengival',
			description:
				'Remoção de tártaro e detritos abaixo da linha da gengiva, visando o tratamento de gengivite e periodontite.',
		},
		{
			name: 'Enxerto gengival',
			description:
				'Procedimento para aumentar a quantidade de tecido gengival, geralmente para cobrir raízes expostas ou em casos de recessão gengival.',
		},
		{
			name: 'Cirurgia periodontal (retalho, reposicionamento gengival)',
			description:
				'Procedimentos cirúrgicos para tratar casos graves de doenças periodontais, incluindo reposição ou remodelação de gengiva.',
		},
		{
			name: 'Tratamento de periodontite (controle de infecção e reabilitação)',
			description:
				'Tratamento da inflamação crônica das gengivas e dos tecidos de suporte dos dentes, com a remoção de bactérias e regeneração do tecido.',
		},
		{
			name: 'Regeneração tecidual guiada',
			description:
				'Técnica usada para estimular o crescimento de tecido ósseo e gengival, especialmente após a perda de estrutura periodontal.',
		},
		{
			name: 'Contorno gengival',
			description:
				'Procedimento estético para melhorar a linha gengival, corrigindo assimetrias ou outros problemas estéticos.',
		},
		{
			name: 'Restauração dental em dentes decíduos (cariados)',
			description:
				'Preenchimento de cáries em dentes de leite, utilizando materiais apropriados para a saúde bucal infantil.',
		},
		{
			name: 'Aplicação de flúor',
			description:
				'Procedimento preventivo que ajuda a fortalecer os dentes, tornando-os mais resistentes à cárie, principalmente nas crianças.',
		},
		{
			name: 'Selamento de fissuras',
			description:
				'Técnica para aplicar uma resina nas fissuras dos dentes para prevenir cáries, especialmente em dentes molares e pré-molares.',
		},
		{
			name: 'Exame e acompanhamento do desenvolvimento dentário infantil',
			description:
				'Monitoramento do crescimento dos dentes na infância, identificando qualquer anormalidade ou necessidade de correção precoce.',
		},
		{
			name: 'Uso de aparelho ortodôntico preventivo (como os expansores)',
			description:
				'Aparelhos usados para corrigir problemas de alinhamento e desenvolvimento da mordida em crianças, antes que se tornem mais graves.',
		},
		{
			name: 'Tratamento de lesões bucais comuns em crianças (como úlceras e aftas)',
			description:
				'Intervenção no tratamento de lesões bucais que podem ocorrer frequentemente nas crianças, proporcionando alívio e recuperação.',
		},
		{
			name: 'Extração de dentes de leite',
			description:
				'Remoção de dentes decíduos em casos de infecção ou quando eles não caem naturalmente, para evitar problemas de alinhamento.',
		},
		{
			name: 'Colocação de implantes dentários',
			description:
				'Procedimento cirúrgico para inserir pinos de titânio no osso maxilar ou mandibular, servindo de base para próteses dentárias.',
		},
		{
			name: 'Enxerto ósseo (para aumento de osso)',
			description:
				'Técnica para aumentar a quantidade de osso maxilar ou mandibular, permitindo a instalação de implantes dentários.',
		},
		{
			name: 'Implantes de carga imediata',
			description:
				'Colocação de uma prótese temporária logo após a instalação do implante, permitindo uma estética e funcionalidade imediatas.',
		},
		{
			name: 'Reabilitação protética sobre implantes (coroas ou pontes)',
			description:
				'Colocação de coroas ou pontes fixas sobre implantes para substituir dentes ausentes, proporcionando estética e função.',
		},
		{
			name: 'Cirurgia de elevação de seio maxilar',
			description:
				'Procedimento para aumentar a quantidade de osso na região do maxilar superior, necessário quando há pouca osseointegração para implantes.',
		},
		{
			name: 'Implantes zigomáticos',
			description:
				'Implantes colocados no osso zigomático (da bochecha) quando há insuficiência óssea no maxilar superior para suportar implantes convencionais.',
		},
		{
			name: 'Planejamento de tratamento para implantes',
			description:
				'Estudo e planejamento detalhado para a colocação de implantes, considerando a anatomia e as necessidades específicas do paciente.',
		},
		{
			name: 'Prótese fixa (coroas, pontes)',
			description:
				'Restauração permanente de dentes ausentes ou danificados, utilizando coroas ou pontes fixas para reconstruir a estética e funcionalidade dental.',
		},
		{
			name: 'Prótese removível (parcial ou total)',
			description:
				'Prótese que pode ser removida pelo paciente, usada para substituir dentes ausentes, em casos de perda dentária parcial ou total.',
		},
		{
			name: 'Prótese sobre implante',
			description:
				'Colocação de próteses fixas sobre implantes dentários, oferecendo uma solução definitiva para a reposição de dentes perdidos.',
		},
		{
			name: 'Restaurações estéticas (como facetas e coroas de porcelana)',
			description:
				'Restaurações estéticas (como facetas e coroas de porcelana)Procedimentos para melhorar a estética dental utilizando materiais como porcelana, que imitam a aparência dos dentes naturais.',
		},
		{
			name: 'Prótese temporária',
			description:
				'Provisória, usada para cobrir dentes enquanto uma prótese permanente está sendo fabricada ou enquanto aguarda a cicatrização de um implante.',
		},
		{
			name: 'Prótese híbrida (parte fixa e removível)',
			description:
				'Combinação de elementos fixos e removíveis para a substituição de dentes em pacientes com grandes perdas dentárias.',
		},
		{
			name: 'Restaurações de resina composta',
			description:
				'Substituição de dentes danificados com resinas compostas que se assemelham ao dente natural, ideal para áreas visíveis.',
		},
		{
			name: 'Clareamento dental',
			description:
				'Procedimento estético que visa remover manchas e tonalidades amareladas dos dentes, proporcionando um sorriso mais branco e brilhante.',
		},
		{
			name: 'Facetas de porcelana',
			description:
				'Lâminas finas de porcelana aplicadas sobre os dentes para melhorar a estética, corrigindo forma, cor e alinhamento.',
		},
		{
			name: 'Lentes de contato dental',
			description:
				'Finas camadas de porcelana ou resina aplicadas na parte frontal dos dentes para alterar a aparência e corrigir imperfeições.',
		},
		{
			name: 'Restaurações estéticas (resinas compostas)',
			description:
				'Restaurações feitas com materiais que imitam a aparência dos dentes naturais, usados em dentes frontais e posteriores.',
		},
		{
			name: 'Contorno estético dental (modelagem dos dentes)',
			description:
				'Procedimentos para melhorar o formato e contorno dos dentes, proporcionando um sorriso mais harmônico.',
		},
		{
			name: 'Restauração de dentes fraturados com materiais estéticos',
			description:
				'Correção de dentes quebrados ou danificados com materiais que imitam a estética natural, como porcelana ou resinas.',
		},
		{
			name: 'Remodelação do sorriso (dental smile design)',
			description:
				'Planejamento e execução de uma série de procedimentos para melhorar a estética do sorriso, alinhando dentes e gengivas.',
		},
		{
			nome: 'Extração de dentes impactados',
			descricao:
				'Remoção de dentes que não erupcionaram corretamente ou estão mal posicionados, como os terceiros molares (sisos).',
		},
		{
			nome: 'Cirurgia ortognática',
			descricao:
				'Procedimento para corrigir deformidades na mandíbula e maxilar, melhorando a função e a estética facial.',
		},
		{
			nome: 'Correção de fraturas faciais e mandibulares',
			descricao:
				'Tratamento cirúrgico para restaurar a integridade óssea e funcionalidade de ossos faciais e mandibulares fraturados.',
		},
		{
			nome: 'Enxerto ósseo maxilar',
			descricao:
				'Transplante de tecido ósseo para a reconstrução da estrutura óssea, preparando o paciente para colocação de implantes.',
		},
		{
			nome: 'Remoção de cistos e tumores bucais',
			descricao: 'Intervenção cirúrgica para remoção de lesões benignas ou malignas na cavidade bucal.',
		},
		{
			nome: 'Cirurgia para correção de deformidades faciais',
			descricao: 'Procedimentos para corrigir deformidades congênitas ou adquiridas na face, mandíbula ou boca.',
		},
		{
			nome: 'Cirurgia para tratamento de lesões orais benignas',
			descricao: 'Remoção de lesões não cancerosas na cavidade bucal, como fibromas e cistos.',
		},
		{
			nome: 'Radiografia periapical',
			descricao:
				'Exame de imagem que captura uma visão detalhada de um dente e suas raízes, útil para detectar cáries e problemas nas raízes dentárias.',
		},
		{
			nome: 'Radiografia panorâmica',
			descricao:
				'Imagem radiográfica que captura toda a arcada dentária, maxilares e articulações temporomandibulares, útil para avaliação geral.',
		},
		{
			nome: 'Tomografia computadorizada cone beam (CBCT)',
			descricao:
				'Exame de imagem em 3D que fornece imagens detalhadas da estrutura óssea, utilizado principalmente para planejamento de implantes.',
		},
		{
			nome: 'Radiografia de seio maxilar',
			descricao:
				'Radiografia que avalia a saúde dos seios maxilares, frequentemente utilizada antes de procedimentos de implantes dentários.',
		},
		{
			nome: 'Exames de imagem para planejamento de implantes',
			descricao:
				'Uso de radiografias e tomografias para avaliar a densidade óssea e a posição de estruturas importantes antes da colocação de implantes.',
		},
		{
			nome: 'Radiografia para diagnóstico de patologias dentárias',
			descricao:
				'Imagens usadas para detectar patologias dentárias, como cáries profundas, infecções ou lesões ósseas.',
		},
		{
			nome: 'Exame de imagens para planejamento de tratamentos ortodônticos',
			descricao:
				'Radiografias e imagens digitais para avaliar a posição dos dentes e planejar o tratamento ortodôntico adequado.',
		},
		{
			nome: 'Diagnóstico de lesões bucais',
			descricao:
				'Avaliação e diagnóstico de lesões que ocorrem na cavidade bucal, como úlceras, aftas e lesões precoces de câncer.',
		},
		{
			nome: 'Biópsia de lesões orais',
			descricao:
				'Procedimento para remover amostras de tecido das lesões bucais para análise laboratorial, ajudando a diagnosticar condições como câncer.',
		},
		{
			nome: 'Tratamento de úlceras bucais e aftas recorrentes',
			descricao:
				'Abordagem para aliviar a dor e tratar lesões recorrentes na boca, muitas vezes associadas a infecções ou condições autoimunes.',
		},
		{
			nome: 'Diagnóstico e acompanhamento de câncer bucal',
			descricao:
				'Avaliação precoce, diagnóstico e monitoramento de tumores malignos na cavidade bucal, incluindo câncer de língua, lábios e gengivas.',
		},
		{
			nome: 'Avaliação de doenças autoimunes (como lúpus)',
			descricao:
				'Identificação e monitoramento de condições sistêmicas que afetam a cavidade bucal, como o lúpus eritematoso sistêmico.',
		},
		{
			nome: 'Tratamento de mucosite e outras condições bucais inflamatórias',
			descricao:
				'Manejo de condições inflamatórias que afetam a mucosa bucal, como a mucosite, que pode ocorrer após tratamentos de câncer.',
		},
		{
			nome: 'Acompanhamento de doenças sistêmicas que afetam a cavidade oral',
			descricao:
				'Monitoramento de doenças sistêmicas que podem ter manifestações na boca, como diabetes, HIV e doenças autoimunes.',
		},
		{
			nome: 'Restauração de dentes cariados com resina composta',
			descricao:
				'Preenchimento de cavidades causadas por cáries com resina composta, que proporciona uma aparência natural.',
		},
		{
			nome: 'Restauração de dentes anteriores com porcelana',
			descricao:
				'Uso de porcelana para restaurar dentes anteriores danificados ou descoloridos, garantindo um resultado estético e funcional.',
		},
		{
			nome: 'Restauração de dentes posteriores',
			descricao:
				'Procedimentos para restaurar dentes posteriores danificados utilizando materiais que oferecem durabilidade e resistência.',
		},
		{
			nome: 'Desgaste dentário (tratamento de dentes fraturados ou desgastados)',
			descricao: 'Reparação de dentes que sofreram desgaste ou fraturas devido a bruxismo ou acidentes.',
		},
		{
			nome: 'Reparo de dentes fraturados',
			descricao:
				'Correção de dentes quebrados ou lascados com resinas ou materiais cerâmicos para devolver a função e estética.',
		},
		{
			nome: 'Restauração de dentes com materiais estéticos (como porcelanas)',
			descricao:
				'Substituição de materiais antigos e menos estéticos por porcelanas e compósitos que imitam melhor os dentes naturais.',
		},
		{
			nome: 'Tratamento de dentes hipoplásicos',
			descricao:
				'Procedimento para tratar dentes que apresentam defeitos de formação, como manchas ou falhas de esmalte, usando materiais estéticos.',
		},
		{
			nome: 'Tratamento da disfunção temporomandibular (DTM)',
			descricao:
				'Intervenção para aliviar a dor e melhorar a função na articulação temporomandibular (ATM), que pode ser causada por vários fatores.',
		},
		{
			nome: 'Terapia para bruxismo',
			descricao:
				'Tratamento do hábito de ranger ou apertar os dentes, muitas vezes utilizando placas de mordida para proteção.',
		},
		{
			nome: 'Tratamento da dor orofacial crônica',
			descricao:
				'Abordagem para tratar dores persistentes na região orofacial, que podem estar associadas a várias condições.',
		},
		{
			nome: 'Terapias para cefaleia tensional',
			descricao: 'Manejo de dores de cabeça relacionadas a tensão muscular na região cervical e facial.',
		},
		{
			nome: 'Tratamento de dor muscular orofacial',
			descricao:
				'Técnicas para aliviar a dor associada aos músculos da face e mandíbula, com o uso de fisioterapia e outras abordagens.',
		},
		{
			nome: 'Reabilitação para dor orofacial pós-cirúrgica',
			descricao:
				'Acompanhamento e tratamento de pacientes que apresentam dor persistente após cirurgias orais ou faciais.',
		},
		{
			nome: 'Terapias psicológicas ou comportamentais para controle da dor crônica orofacial',
			descricao:
				'Tratamento que inclui abordagens comportamentais ou psicológicas para controlar a dor crônica na região orofacial, como a terapia cognitivo-comportamental.',
		},
	]
	await checkingDBToInsertSeeds(patientsTreatments, 'patientTreatment', 'name')
	console.table('Tipos de Tratamentos inseridos com sucesso.')

	/* ------------------ PATIENTS HISTORY ------------------ */
	const patientsHistory = [
		{
			height: 175,
			weight: 70,
			birth: new Date('1985-06-15'),
			gender: 'Masculino',
			civil: 'Casado',
			occupation: 'Engenheiro de Software',
			medicament: 'Aspirina',
			comorbidity: 'Hipertensão',
			observation: 'Paciente em tratamento regular com acompanhamento médico.',
		},
		{
			height: 160,
			weight: 58,
			birth: new Date('1992-12-02'),
			gender: 'Feminino',
			civil: 'Solteira',
			occupation: 'Designer Gráfico',
			medicament: 'Ibuprofeno',
			comorbidity: 'Nenhuma',
			observation: 'Paciente saudável, sem histórico de doenças graves.',
		},
		{
			height: 180,
			weight: 85,
			birth: new Date('1978-03-10'),
			gender: 'Masculino',
			civil: 'Divorciado',
			occupation: 'Professor Universitário',
			medicament: 'Lisinopril',
			comorbidity: 'Diabetes Tipo 2',
			observation: 'Paciente com histórico de diabetes controlado e hipertensão.',
		},
		{
			height: 165,
			weight: 63,
			birth: new Date('2000-07-22'),
			gender: 'Feminino',
			civil: 'Casada',
			occupation: 'Médica',
			medicament: 'Metformina',
			comorbidity: 'Síndrome do Ovário Policístico',
			observation: 'Paciente em acompanhamento endocrinológico.',
		},
		{
			height: 170,
			weight: 75,
			birth: new Date('1990-11-30'),
			gender: 'Masculino',
			civil: 'Solteiro',
			occupation: 'Advogado',
			medicament: 'Losartana',
			comorbidity: 'Asma',
			observation: 'Paciente com asma controlada e em uso de inalador.',
		},
	]
	await checkingDBToInsertSeeds(patientsHistory, 'patientHistory', 'observation')
	console.table('Histórico de Pacientes inseridos com sucesso.')

	/* ------------------ PATIENTS ------------------ */
	const patients = [
		{
			name: 'Carlos Almeida',
			email: 'carlos.almeida@example.com',
			contact: '11912345678',
			patient_treatment_id: 1,
			patient_history_id: 1,
			address_id: 1,
		},
		{
			name: 'Ana Souza',
			email: 'ana.souza@example.com',
			contact: '11998765432',
			patient_treatment_id: 11,
			patient_history_id: 2,
			address_id: 2,
		},
		{
			name: 'Rafael Costa',
			email: 'rafael.costa@example.com',
			contact: '21987654321',
			patient_treatment_id: 5,
			patient_history_id: 3,
			address_id: 3,
		},
		{
			name: 'Tatiana Silva',
			email: 'tatiana.silva@example.com',
			contact: '21999876543',
			patient_treatment_id: 22,
			patient_history_id: 4,
			address_id: 4,
		},
		{
			name: 'Felipe Rocha',
			email: 'felipe.rocha@example.com',
			contact: '31911112222',
			patient_treatment_id: 38,
			patient_history_id: 5,
			address_id: 5,
		},
	]
	await checkingDBToInsertSeeds(patients, 'patient', 'name')
	console.table('Pacientes inseridos com sucesso.')

	/* ------------------ APPOINTMENTS STATUS ------------------ */
	const appointmentsStatus = [
		{ name: 'Agendado' },
		{ name: 'Em espera' },
		{ name: 'Em atendimento' },
		{ name: 'Atrasado' },
		{ name: 'Tratamento pausado' },
		{ name: 'Finalizado' },
		{ name: 'Cancelado' },
	]
	await checkingDBToInsertSeeds(appointmentsStatus, 'appointmentStatus', 'name')
	console.table('Status dos Agendamentos inseridos com sucesso.')

	/* ------------------ APPOINTMENTS ------------------ */
	const appointments = [
		{
			patient_id: 1,
			doctor_id: 1,
			appointment: new Date('2024-10-29'),
			status_id: 1,
		},
		{
			patient_id: 2,
			doctor_id: 2,
			appointment: new Date('2024-10-30'),
			status_id: 2,
		},
		{
			patient_id: 3,
			doctor_id: 3,
			appointment: new Date('2024-10-31'),
			status_id: 3,
		},
		{
			patient_id: 4,
			doctor_id: 4,
			appointment: new Date('2024-11-01'),
			status_id: 4,
		},
		{
			patient_id: 5,
			doctor_id: 5,
			appointment: new Date('2024-11-02'),
			status_id: 2,
		},
		{
			patient_id: 3,
			doctor_id: 3,
			appointment: new Date('2024-11-04'),
			status_id: 3,
		},
		{
			patient_id: 2,
			doctor_id: 2,
			appointment: new Date('2024-11-05'),
			status_id: 2,
		},
	]
	await checkingDBToInsertSeeds(appointments, 'appointment', 'appointment')
	console.table('Agendamentos inseridos com sucesso.')

	/* ------------------ ITEMS CATEGORY ------------------ */
	const itemsCategory = [
		{ name: 'Equipamentos de Proteção Individual (EPIs)' },
		{ name: 'Equipamentos para Procedimentos Odontológicos' },
		{ name: 'Materiais Odontológicos' },
		{ name: 'Equipamentos Auxiliares' },
		{ name: 'Materiais de Uso Geral' },
		{ name: 'Itens de Apoio e Conforto' },
	]
	await checkingDBToInsertSeeds(itemsCategory, 'itemCategory', 'name')
	console.table('Categoria dos Itens inseridas com sucesso.')

	/* ------------------ ITEMS ------------------ */
	const items = [
		{
			name: 'Luvas descartáveis',
			description:
				'Luvas de látex, nitrilo ou vinil, utilizadas para proteger as mãos dos profissionais e evitar contaminação cruzada durante os procedimentos odontológicos.',
			quantity: 51,
			price: 10.7,
			category_id: 1,
		},
		{
			name: 'Máscaras cirúrgicas',
			description:
				'Máscaras descartáveis, em geral de 3 camadas, utilizadas para proteger contra a transmissão de agentes infecciosos durante os procedimentos odontológicos.',
			quantity: 17,
			price: 7.14,
			category_id: 1,
		},
		{
			name: 'Toucas descartáveis ou toucas de tecido',
			description:
				'Toucas descartáveis, geralmente de material não tecido, para cobrir os cabelos durante os procedimentos, evitando contaminações.',
			quantity: 98,
			price: 4.18,
			category_id: 1,
		},
		{
			name: 'Aventais descartáveis ou de tecido impermeável',
			description:
				'Aventais descartáveis, geralmente impermeáveis, usados para proteger as roupas do profissional durante procedimentos odontológicos.',
			quantity: 22,
			price: 11.48,
			category_id: 1,
		},
		{
			name: 'Óculos de proteção ou protetores faciais',
			description:
				'Óculos ou protetores faciais descartáveis, usados para proteger os olhos e o rosto contra respingos de líquidos, poeira ou detritos durante os procedimentos.',
			quantity: 8,
			price: 50,
			category_id: 1,
		},
		{
			name: 'Proteção auditiva',
			description:
				'Protetores auditivos utilizados para proteger os ouvidos do profissional contra níveis elevados de ruído, especialmente em clínicas com equipamentos de alta potência.',
			quantity: 18,
			price: 15.19,
			category_id: 1,
		},
		{
			name: 'Brocas e peças de mão',
			description:
				'Brocas de diferentes tipos, usadas em turbinas ou micromotores para procedimentos como limpeza, remoção de cáries e acabamento de restaurações.',
			quantity: 47,
			price: 19.99,
			category_id: 2,
		},
		{
			name: 'Câmara de esterilização',
			description:
				'Equipamento utilizado para esterilizar instrumentos odontológicos, aplicando calor, pressão e vapor para garantir a eliminação de microrganismos patogênicos.',
			quantity: 2,
			price: 6670,
			category_id: 2,
		},
		{
			name: 'Curetas e exploradores',
			description:
				'Instrumentos utilizados para a remoção de placa bacteriana e cálculo dental, além de explorar as cavidades dentárias em busca de cáries.',
			quantity: 25,
			price: 62,
			category_id: 2,
		},
		{
			name: 'Sonda periodontal',
			description:
				'Instrumento utilizado para medir a profundidade das bolsas periodontais e examinar a saúde gengival.',
			quantity: 25,
			price: 20,
			category_id: 2,
		},
		{
			name: 'Espelho odontológico',
			description:
				'Pequeno espelho utilizado para visualização de áreas do dente e gengiva em locais de difícil acesso durante o procedimento.',
			quantity: 11,
			price: 57,
			category_id: 2,
		},
		{
			name: 'Pinças',
			description:
				'Pinças de diferentes formas e tamanhos usadas para manipular materiais, como algodão, ligaduras e outros acessórios durante os procedimentos.',
			quantity: 25,
			price: 16,
			category_id: 2,
		},
		{
			name: 'Aspiradores',
			description:
				'Equipamentos usados para remoção de saliva e outros resíduos orais durante os procedimentos odontológicos.',
			quantity: 11,
			price: 70,
			category_id: 2,
		},
		{
			name: 'Sistemas de fotopolimerização',
			description:
				'Dispositivos utilizados para endurecer resinas compostas por meio de luz de alta intensidade, no tratamento de restaurações dentárias.',
			quantity: 9,
			price: 200,
			category_id: 2,
		},
		{
			name: 'Ultrassom odontológico',
			description:
				'Equipamento usado para a remoção de tártaro e placas bacterianas, utilizando ondas de ultrassom para a limpeza dental.',
			quantity: 5,
			price: 4746,
			category_id: 2,
		},
		{
			name: 'Radiografia digital',
			description:
				'Sistema de diagnóstico por imagem que utiliza radiação para criar imagens digitais das estruturas dentárias e ósseas, permitindo avaliação precisa.',
			quantity: 2,
			price: 7000,
			category_id: 2,
		},
		{
			name: 'Sistemas de irrigação e aspiração',
			description:
				'Equipamentos usados para irrigar e aspirar líquidos e resíduos durante os procedimentos cirúrgicos ou tratamentos de canal.',
			quantity: 5,
			price: 455,
			category_id: 2,
		},
		{
			name: 'Cimentos dentários',
			description:
				'Substâncias usadas para colar restaurações, coroas ou próteses dentárias, oferecendo fixação duradoura.',
			quantity: 76,
			price: 40,
			category_id: 3,
		},
		{
			name: 'Resinas compostas',
			description:
				'Materiais utilizados para restaurações estéticas, que imitam a cor natural dos dentes, proporcionando um acabamento discreto e eficaz.',
			quantity: 76,
			price: 30,
			category_id: 3,
		},
		{
			name: 'Amálgama',
			description:
				'Material restaurador utilizado em dentes posteriores, conhecido por sua durabilidade, especialmente em cavitações de grande tamanho.',
			quantity: 200,
			price: 318,
			category_id: 3,
		},
		{
			name: 'Fios ortodônticos',
			description:
				'Fios de metal utilizados no tratamento ortodôntico para mover os dentes, sendo fixados aos braquetes.',
			quantity: 200,
			price: 20,
			category_id: 3,
		},
		{
			name: 'Borracha de aparelho',
			description:
				'Elásticos coloridos usados em aparelhos ortodônticos para ajudar a mover os dentes e ajustar a mordida.',
			quantity: 548,
			price: 8,
			category_id: 3,
		},
		{
			name: 'Bandas e braquetes',
			description:
				'Componentes utilizados para a fixação de aparelhos ortodônticos, sendo os braquetes fixados nos dentes e as bandas em torno dos dentes posteriores.',
			quantity: 490,
			price: 7,
			category_id: 3,
		},
		{
			name: 'Géis desensibilizantes ou de clareamento dental',
			description:
				'Géis utilizados para reduzir a sensibilidade dentária ou realizar o clareamento dos dentes, proporcionando resultados estéticos e confortáveis.',
			quantity: 48,
			price: 37,
			category_id: 3,
		},
		{
			name: 'Cimentos de contenção',
			description:
				'Cimentos específicos usados para fixar dispositivos ortodônticos ou contenções após a retirada do aparelho.',
			quantity: 76,
			price: 40,
			category_id: 3,
		},
		{
			name: 'Limas e arquivos endodônticos',
			description:
				'Instrumentos utilizados em tratamentos de canal, para a limpeza e conformação dos canais radiculares.',
			quantity: 100,
			price: 18,
			category_id: 3,
		},
		{
			name: 'Clorexidina',
			description: 'Antisséptico usado para reduzir a formação de placa bacteriana e tratar inflamações gengivais.',
			quantity: 80,
			price: 7,
			category_id: 3,
		},
		{
			name: 'Anestésicos locais',
			description:
				'Substâncias utilizadas para bloquear a sensação de dor durante os procedimentos odontológicos, garantindo conforto ao paciente.',
			quantity: 38,
			price: 15,
			category_id: 3,
		},
		{
			name: 'Alginato',
			description:
				'Material de moldagem utilizado para fazer moldes dentários, essencial para a confecção de próteses ou alinhadores.',
			quantity: 38,
			price: 34.9,
			category_id: 3,
		},
		{
			name: 'Gesso para moldagem',
			description:
				'Material utilizado para criar moldes a partir das impressões dos dentes, essencial para a confecção de próteses e outros dispositivos.',
			quantity: 38,
			price: 34.9,
			category_id: 3,
		},
		{
			name: 'Balde de esterilização',
			description:
				'Recipiente utilizado para armazenar e transportar instrumentos contaminados, garantindo sua esterilização antes do uso.',
			quantity: 30,
			price: 17.5,
			category_id: 4,
		},
		{
			name: 'Esterilizadores ultravioleta',
			description:
				'Equipamentos usados para esterilizar pequenos instrumentos ou superfícies através da radiação ultravioleta.',
			quantity: 25,
			price: 79.14,
			category_id: 4,
		},
		{
			name: 'Carrinho de instrumentais',
			description:
				'Carrinho móvel para organização e transporte de instrumentos odontológicos durante os procedimentos.',
			quantity: 3,
			price: 1400,
			category_id: 4,
		},
		{
			name: 'Lampadas de fotopolimerização',
			description:
				'Equipamento utilizado para curar resinas compostas através da emissão de luz de alta intensidade, acelerando o processo de endurecimento do material.',
			quantity: 8,
			price: 60,
			category_id: 4,
		},
		{
			name: 'Cadeiras odontológicas',
			description:
				'Cadeiras ajustáveis e ergonômicas para proporcionar conforto ao paciente durante os tratamentos odontológicos.',
			quantity: 4,
			price: 50.0,
			category_id: 4,
		},
		{
			name: 'Iluminação adequada',
			description:
				'Sistema de iluminação direcionada e intensa, essencial para garantir uma boa visibilidade durante os procedimentos odontológicos.',
			quantity: 5,
			price: 60,
			category_id: 4,
		},
		{
			name: 'Sistema de ventilação',
			description:
				'Equipamento de ventilação utilizado para garantir a circulação adequada de ar na sala de atendimento, prevenindo a contaminação.',
			quantity: 4,
			price: 1200,
			category_id: 4,
		},
		{
			name: 'Equipamento de raio-X',
			description:
				'Equipamento para a realização de exames de raio-X, essencial para diagnóstico de condições dentárias e ósseas.',
			quantity: 2,
			price: 7000,
			category_id: 4,
		},
		{
			name: 'Sistema de aspirador de saliva',
			description:
				'Equipamento utilizado para a remoção de saliva e resíduos durante o procedimento odontológico, garantindo o campo operatório limpo.',
			quantity: 4,
			price: 420,
			category_id: 4,
		},
		{
			name: 'Algodão',
			description:
				'Discos ou bolinhas de algodão utilizadas para absorver líquidos, como saliva, sangue ou medicamentos, além de auxiliar na limpeza durante os procedimentos odontológicos.',
			quantity: 600,
			price: 19.25,
			category_id: 5,
		},
		{
			name: 'Gaze',
			description:
				'Gaze estéril utilizada para controlar sangramentos durante ou após os procedimentos, além de ser aplicada em áreas cirúrgicas para proteger feridas.',
			quantity: 500,
			price: 32.86,
			category_id: 5,
		},
		{
			name: 'Fios de sutura',
			description:
				'Fios cirúrgicos utilizados para fechar incisões feitas durante procedimentos odontológicos, como extrações ou cirurgias periodontais, promovendo a cicatrização.',
			quantity: 365,
			price: 18.36,
			category_id: 5,
		},
		{
			name: 'Pinças de dissecção ou de cirurgia',
			description:
				'Pinças especializadas usadas em procedimentos cirúrgicos para segurar ou manipular tecidos, vasos sanguíneos e outros elementos durante uma operação odontológica.',
			quantity: 50,
			price: 30,
			category_id: 5,
		},
		{
			name: 'Espátulas',
			description:
				'Espátulas de metal ou plástico utilizadas para misturar materiais odontológicos, como resinas ou cimentos, ou para aplicar esses materiais nas cavidades dentárias.',
			quantity: 50,
			price: 82,
			category_id: 5,
		},
		{
			name: 'Cotonetes',
			description:
				'Bastões de algodão com extremidades finas, usados para a aplicação de medicamentos ou substâncias em áreas pequenas ou de difícil acesso dentro da cavidade oral.',
			quantity: 300,
			price: 89,
			category_id: 5,
		},
		{
			name: 'Papel absorvente',
			description:
				'Papéis especiais utilizados para secar os dentes e a área ao redor durante os tratamentos, evitando que a umidade interfira nos materiais usados (como resinas).',
			quantity: 300,
			price: 149,
			category_id: 5,
		},
		{
			name: 'Dispositivos de proteção para os dentes',
			description:
				'Dispositivos protetores, como mordentes ou protetores bucais, utilizados para proteger os dentes de traumas, especialmente durante atividades esportivas ou tratamentos ortodônticos.',
			quantity: 120,
			price: 299,
			category_id: 5,
		},
		{
			name: 'Toalhas e lençóis descartáveis',
			description:
				'Toalhas e lençóis descartáveis usados para cobrir os pacientes e manter a higiene durante os atendimentos.',
			quantity: 250,
			price: 17.47,
			category_id: 6,
		},
		{
			name: 'Capa de proteção para cadeiras',
			description:
				'Capa descartável utilizada para cobrir as cadeiras odontológicas e mantê-las limpas durante os atendimentos.',
			quantity: 10,
			price: 120,
			category_id: 6,
		},
		{
			name: 'Almofadas e travesseiros',
			description:
				'Almofadas e travesseiros usados para proporcionar conforto ao paciente durante o atendimento odontológico.',
			quantity: 8,
			price: 162,
			category_id: 6,
		},
		{
			name: 'Sistema de áudio ou vídeo',
			description:
				'Dispositivos usados para proteger os dentes de traumas durante procedimentos ou para pacientes com bruxismo.',
			quantity: 5,
			price: 1200,
			category_id: 6,
		},
	]
	await checkingDBToInsertSeeds(items, 'item', 'name')
	console.table('Equipamentos inseridos com sucesso.')

	/* ------------------ FINISHING ------------------ */
	console.table('Finalização da inserção das seeds 😊')
}

execSeeds()
