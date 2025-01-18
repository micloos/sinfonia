import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Início', href: '/sinfonia', icon: HomeIcon,  pname: 'Início', },
  { name: 'Reunião', href: '/sinfonia/reuniao', icon: UserGroupIcon, pname: 'REUNIÃO', },
  { name: 'Documentos', href: '/sinfonia/documentos',  icon: DocumentDuplicateIcon, pname: 'DOCUMENTOS', },
  { name: 'Administração', href: '/sinfonia/administracao', icon: PencilSquareIcon, pname: 'Administração', },
];

const linksr = [
  { name: 'Abertas', href: '/sinfonia/reuniao', icon: UserGroupIcon,  pname: 'Aberta', },
  { name: 'Fechadas', href: '/sinfonia/reuniao/fechadas', icon: UserGroupIcon,  pname: 'Fechada', },
  { name: 'Participantes', href: '/sinfonia/administracao/participantes', icon: UserGroupIcon, pname: 'REUNIÃO', },
  { name: 'Ordem do Dia', href: '/sinfonia/reuniao/ordemdia',  icon: DocumentDuplicateIcon, pname: 'DOCUMENTOS', },
  { name: 'Pauta', href: '/sinfonia/reuniao/pauta', icon: PencilSquareIcon, pname: 'Administração', },
  { name: 'Execução', href: '/sinfonia/reuniao/execucao', icon: PencilSquareIcon, pname: 'Administração', },
  { name: 'Avaliação Plano', href: '/sinfonia/reuniao/plano', icon: PencilSquareIcon, pname: 'Administração', },
  { name: 'Relatorios', href: '/sinfonia/reuniao/relatorios', icon: PencilSquareIcon, pname: 'Administração', },
];

const linksd = [
  { name: 'Baixar', href: '/sinfonia/documentos/baixar', icon: PencilSquareIcon, pname: 'Baixar', },
];

const linksa = [
  { name: 'Usuários', href: '/sinfonia/administracao/usuarios', icon: UserGroupIcon,  pname: 'Usuários', },
  { name: 'Participantes', href: '/sinfonia/administracao/participantes', icon: UserGroupIcon, pname: 'Participantes Usuais', },
  { name: 'Upload', href: '/sinfonia/administracao/upload', icon: DocumentDuplicateIcon,  pname: 'Upload de Documentos', },
  { name: 'Assuntos', href: '/sinfonia/administracao/assuntos', icon: UserGroupIcon,  pname: 'Assuntos da Reunião', },
  { name: 'Reunioes', href: '/sinfonia/administracao/reunioes', icon: UserGroupIcon,  pname: 'Reabrir Reunião', },
];

export { links, linksr, linksa, linksd };
