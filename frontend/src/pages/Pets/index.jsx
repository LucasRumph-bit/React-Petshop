import { useEffect, useState } from "react";
import { PetsService, OwnersService } from "../../services/resourcesService";

const emptyForm = {
    name: "",
    species: "",
    breed: "",
    size: 'small',
    age: '',
    weight: '',
    notes: '',
    ownerId: '',
};

export default function PetsPage() {
    const [pets, setPets] = useState([]);
    const [owners, setOwners] = useState([]);
    const [loading, setloading] = useState(true);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [editingPet, setEditingPet] = useState(null);
    const [detailPet, setDetailPet] = useState(null);
    const [message, setMessage] = useState('');


async function loadData() {
    try {
        setloading(true);

        const petsData = await PetsService.list();
        const ownersData = await OwnersService.list();

        setPets(petsData);
        setOwners(ownersData);
    } catch (error) {
        console.error('Erro ao carregar dados:',);
    } finally {
        setloading(false);
    }
}

useEffect(() => {
    console.log("aqui")
    loadData();
    console.log(pets, owners)
}, []);

function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
}

function getSizeText(size) {
    if (size === 'small') return 'Pequeno';
    if (size === 'medium') return 'Médio';
    if (size === 'large') return 'Grande';
    return size;
}

function formatDate(date) {
    if (!date) return '';

    return new Date(date).toLocaleDateString('pt-BR');
}

function formatMoney(value) {
    if (!value) return 'R$ 0,00';

    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getStatusText(status) {
    if (status === 'scheuled') return 'Agendado';
    if (status === 'in_progress') return 'Em andamento';
    if (status === 'completed') return 'Concluído';
    if (status === 'canceled') return 'Cancelado';
    return status;
}

async function handleSubmit(e) {
    e.preventDefault();

    if (
        !form.name ||
        !form.species ||
        !form.breed ||
        !form.ownerId ||
        !form.age ||
        !form.weight
    ) {
        setMessage('Preencha todos os campos obrigatórios');
        return;
    }

    const playload = {
        name: form.name,
        species: form.species,
        breed: form.breed,
        size: form.size,
        age: Number(form.age),
        weight: Number(form.weight),
        notes: form.notes,
        ownerId: Number(form.ownerId),
    };

    try {
        if (editingPet) {
            await PetsService.update(editingPet.id, playload);
            setMessage('Pet atualizado com sucesso');
        } else {
            await PetsService.create(playload);
            setMessage('Pet criado com sucesso');
        }

        clearForm();
        loadData();
    } catch (error) {
        console.error('Erro ao salvar pet:', error);
        setMessage('Erro ao salvar pet');
    }
}

function handleEdit(pet) {
    setEditingPet(pet);
    setForm({
        name: pet.name || '',
        species: pet.species || '',
        breed: pet.breed || '',
        size: pet.size || 'small',
        age: pet.age || '',
        weight: pet.weight || '',
        notes: pet.notes || '',
        ownerId: pet.ownerId || '',
    });
}

async function handleDetails(pet) {
    try {
        const data = await PetsService.getById(pet.id);
        setDetailPet(data);
    } catch (error) {
        console.error('Erro ao carregar detalhes do pet:');
    }
}

async function handleDelete(pet) {
    const confirm = window.confirm(
        'Deseja excluir ${pet.name}?'
    )

    if (!confirmDelete) return;

    try {
        await PetsService.delete(pet.id);
        setMessage('Pet excluído com sucesso');
        loadData();
    } catch (error) {
        console.error('Erro ao excluir pet:', error);
        setMessage('Erro ao excluir pet');
    }
}

const filteredPets = pets.filter((pet) => {
    const term = search.toLowerCase();
    return (
        pet.name.toLowerCase().includes(term) ||
        pet.species.toLowerCase().includes(term) ||
        pet.breed.toLowerCase().includes(term) ||
        pet.ownerId.toString().includes(term)
    );
});

if (loading) {
    return <p>Carregando...</p>;
}

return (
    <div>
        <h1>Pets</h1>

        <p>Cadastre e acompanhe os animais atendidos pelo petshop</p>

        {message && <p>{message}</p>}

        <hr />

        <h2>{editingPet ? 'Editar Pet' : 'Novo pet'}</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome</label>
                <br />
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Espécie*</label>
                <br />
                <input
                    type="text"
                    name="species"
                    value={form.species}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Raça*</label>
                <br />
                <input
                    type="text"
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                />
            </div>
        </form>

        <select
            name="ownerId"
            value={form.ownerId}
            onChange={handleChange}
        >
            <option value="">Selecione</option>
            {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                    {owner.name}
                </option>
            ))}
        </select>

        <input
            placeholder="Buscar por nome, espécie, raca ou dono"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        {filteredPets.length === 0 ? (
            <p>Nenhum pet encontrado</p>
        ) : (
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Espécie</th>
                        <th>Raça</th>
                        <th>Porte</th>
                        <th>Dono</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredPets.map((pet) => (
                        <tr key={pet.id}>
                            <td>{pet.name}</td>
                            <td>{pet.species}</td>
                            <td>{pet.breed}</td>
                            <td>{getSizeText(pet.size)}</td>
                            <td>{pet.owner?.name || '-'}</td>
                            <td>
                                <button onClick={() => handleDetails(pet)}>Detalhes</button>
                                <button onClick={() => handleEdit(pet)}>Editar</button>
                                <button onClick={() => handleDelete(pet)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        {detailPet && (
            <div>
                <h2>Detalhes de pet</h2>

                <p><strong>Nome:</strong> {detailPet.name}</p>
                <p><strong>Dono:</strong> {detailPet.owner?.name || '-'}</p>
                <p><strong>Espécie:</strong> {detailPet.species}</p>
                <p><strong>Raça:</strong> {detailPet.breed}</p>
                <p><strong>Porte:</strong> {getSizeText(detailPet.size)}</p>
                <p><strong>Peso:</strong> {detailPet.weight} kg</p>
                <p><strong>Observações:</strong> {detailPet.observations || "Sem observações"}</p>

                <h3>Historico recente</h3>

                {detailPet.services?.length > 0 ? (
                    <ul>
                        {detailPet.services.slice(0, 4).map((service) => (
                            <li key={service.id}>
                                {service.serviceType?.name || 'Servico'} - {' '}
                                {formatDate(service.servicedate)} - {' '}
                                {formatMoney(service.chargedAmount)} - {''}
                                {getStatusText(service.status)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum serviço realizado ainda</p>
                )}

                <button onClick={() => setDetailPet(null)}>Fechar</button>
            </div>
        )}
    </div>
);
}