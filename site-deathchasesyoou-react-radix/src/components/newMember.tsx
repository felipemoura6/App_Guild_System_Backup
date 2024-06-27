import { FormInputText } from "./form/formInputText";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from 'sonner'
//import { useNavigate } from 'react-router-dom';


export function NewMember() {
  const [name, setName] = useState('');
  const [classe, setClasse] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [race, setRace] = useState('');
  const [tier, setTier] = useState('D');
  const [note, setNote] = useState('');
  const [image, setImage] = useState("./src/assets/characters_imgs/UNKNOWN_img.png");
  //const navigate = useNavigate();


  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClasseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setClasse(event.target.value);
  };

  const handleRaceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRace(event.target.value);
  };
  
  const handleSpecChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSpecialization(event.target.value);
  };

  const handleTierChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTier(event.target.value);
  };  

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
        const uniqueName = `${name.toLocaleLowerCase()}`;
        const newFileName = `./src/assets/characters_imgs/${uniqueName}_img.png`;
        setImage(newFileName);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }
};

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name || !classe || !specialization || !race || !tier || !note) {
      // Se algum dos campos estiver em branco, exiba uma mensagem ou tome outra ação
      alert('Please, informations field can not be empty!')
      return;
    }

    // Crie um objeto com os dados do novo membro
    const newMemberData = {
      name,
      class: classe,
      race,
      specialization,
      note,
      tier,
      image,
    };

    console.log('Data to be sent:', newMemberData);

    // Faça a requisição POST para adicionar o novo membro
    fetch("http://localhost:5000/members", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newMemberData),
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
      return resp.json();
    })
    .then((data) => {
      console.log(data)
      toast.success(`${name} added sucessful to the Guild Members`);
      setName('');
      setClasse('');
      setSpecialization('');
      setRace('');
      setTier('D');
      setNote('');
      setImage('./src/assets/characters_imgs/UNKNOWN_img.png');
    })
    .catch((err) => {
      console.error('Error:', err);
    });

    //navigate('http://localhost:5173');
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div className="w-full h-full mb-2 overflow-y-auto">
            <h1 className="text-slate-300 text-2xl p-5 flex justify-center">New Member</h1>
            <div className="h-px bg-pink-100 mb-2"></div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member name in-game:</p>
                    <FormInputText
                        type="text"
                        name="name"
                        id="name"
                        placeholder="type new member name"
                        text="name"
                        handleOnChange={handleNameChange}
                        value={name}
                    />
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Select new member class:</p>
                    <select
                      name="classe"
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleClasseChange}
                      value={classe}
                      >

                      <option value="" disabled hidden>
                        Select class
                      </option>
                      <option value="Warrior">Warrior</option>
                      <option value="Paladin">Paladin</option>
                      <option value="Death Knight">Death Knight</option>
                      <option value="Rogue">Rogue</option>
                      <option value="Hunter">Hunter</option>
                      <option value="Priest">Priest</option>
                      <option value="Mage">Mage</option>
                      <option value="Warlock">Warlock</option>
                      <option value="Shaman">Shaman</option>
                      <option value="Druid">Druid</option>
                    </select>
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member spec:</p>
                    <select
                      name="specialization"
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleSpecChange}
                      value={specialization}
                    >
                      <option value="" disabled hidden>
                        Select specialization
                      </option>

                      {classe === "Warrior" && (
                      <>
                          <option value="Arms">Arms</option>
                          <option value="Fury">Fury</option>
                          <option value="Protection">Protection</option>
                      </>
                      )}

                      {classe === "Paladin" && (
                        <>
                          <option value="Holy">Holy</option>
                          <option value="Retribuition">Retribuition</option>
                          <option value="Protection">Protection</option>
                        </>
                      )}

                      {classe === "Death Knight" && (
                        <>
                          <option value="Blood">Blood</option>
                          <option value="Frost">Frost</option>
                          <option value="Unholy">Unholy</option>
                        </>
                      )}

                      {classe === "Rogue" && (
                        <>
                          <option value="Assassination">Assassination</option>
                          <option value="Combat">Combat</option>
                          <option value="Subtlety">Subtlety</option>
                        </>
                      )}

                      {classe === "Hunter" && (
                        <>
                          <option value="Beast Mastery">Beast Mastery</option>
                          <option value="Marksmanship">Marksmanship</option>
                          <option value="Survival">Survival</option>
                        </>
                      )}

                      {classe === "Priest" && (
                        <>
                          <option value="Discipline">Discipline</option>
                          <option value="Holy">Holy</option>
                          <option value="Shadow">Shadow</option>
                        </>
                      )}

                      {classe === "Mage" && (
                        <>
                          <option value="Arcane">Arcane</option>
                          <option value="Fire">Fire</option>
                          <option value="Frost">Frost</option>
                        </>
                      )}

                      {classe === "Warlock" && (
                        <>
                          <option value="Afflyction">Afflyction</option>
                          <option value="Demonology">Demonology</option>
                          <option value="Destruction">Destruction</option>
                        </>
                      )}

                      {classe === "Shaman" && (
                        <>
                          <option value="Enhancement">Enhancement</option>
                          <option value="Elemental">Elemental</option>
                          <option value="Restoration">Restoration</option>
                        </>
                      )}

                      {classe === "Druid" && (
                        <>
                          <option value="Balance">Balance</option>
                          <option value="Feral">Feral</option>
                          <option value="Restoration">Restoration</option>
                        </>
                      )}
                    </select>
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member race:</p>
                    <select
                      name="race"
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleRaceChange}
                      value={race}
                    >
                      <option value="" disabled hidden>
                        Select race
                      </option>

                      {classe === "Warrior" && (
                        <>
                          <option value="Orc">Orc</option>
                          <option value="Tauren">Tauren</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {classe === "Paladin" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                        </>
                      )}

                      {classe === "Death Knight" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Orc">Orc</option>
                          <option value="Tauren">Tauren</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {classe === "Rogue" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Orc">Orc</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {classe === "Hunter" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Orc">Orc</option>
                          <option value="Tauren">Tauren</option>
                          <option value="Troll">Troll</option>
                        </>
                      )}

                      {classe === "Priest" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {classe === "Mage" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {classe === "Warlock" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Orc">Orc</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {classe === "Shaman" && (
                        <>
                          <option value="Orc">Orc</option>
                          <option value="Tauren">Tauren</option>
                          <option value="Troll">Troll</option>
                        </>
                      )}

                      {classe === "Druid" && (
                        <>
                          <option value="Tauren">Tauren</option>
                        </>
                      )}
                    </select>
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member tier:</p>
                    <select
                      name="tier"
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleTierChange}
                      value={tier}
                    >
                      <option value="S">Tier S</option>
                      <option value="A">Tier A</option>
                      <option value="B">Tier B</option>
                      <option value="C">Tier C</option>
                      <option value="D">Tier D</option>
                    </select>
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member note:</p>
                    <FormInputText
                        type="text"
                        name="note"
                        id="note"
                        placeholder="type new member note"
                        text="note"
                        handleOnChange={handleNoteChange}
                        value={note}
                    />
              </div>

              <div className="block justify-center items-center">
                <label className="mb-1 font-bold sr-only" htmlFor={name}>
                  {`Image of ${name}`}
                </label>
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Upload new member image:</p>
                      <input
                        className="rounded-md px-2 py-1 border border-gray-300 w-[160px]"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                </div>
              </div>

              {image && <img src={image} alt="New Member image" className="max-w-[80px] max-h-[100px] mt-2 mx-auto" />}
            
          </div>

          <div className="flex justify-center items-center mt-[1rem]">
              <button type="submit" className="bg-slate-700 text-zinc-300 px-3 py-1 border-2 border-zinc-500">Send</button>
          </div>
      </div>
    </form>
  );
}


// const raceOptions = {
//   Warrior: ['Orc', 'Tauren', 'Troll', 'Undead'],
//   Paladin: ['Blood Elf'],
//   DeathKnight: ['Orc', 'Tauren', 'Troll', 'Undead'],
//   Rogue: ['Blood Elf', 'Orc', 'Troll', 'Undead'],
//   Hunter: ['Blood Elf', 'Orc', 'Tauren', 'Troll'],
//   Priest: ['Blood Elf', 'Troll', 'Undead'],
//   Mage: ['Blood Elf', 'Troll', 'Undead'],
//   Warlock: ['Blood Elf', 'Orc', 'Undead'],
//   Shaman: ['Orc', 'Tauren', 'Troll'],
//   Druid: ['Tauren'],
// };

// const specOptions = {
//   Warrior: ['Arms', 'Fury', 'Protection'],
//   Paladin: ['Holy', 'Retribution', 'Protection'],
//   DeathKnight: ['Blood', 'Frost', 'Unholy'],
//   Rogue: ['Assassination', 'Combat', 'Subtlety'],
//   Hunter: ['Beast Mastery', 'Marksmanship', 'Survival'],
//   Priest: ['Discipline', 'Holy', 'Shadow'],
//   Mage: ['Arcane', 'Fire', 'Frost'],
//   Warlock: ['Afflyction', 'Demonology', 'Destruction'],
//   Shaman: ['Elemental', 'Enhancement', 'Restoration'],
//   Druid: ['Balance', 'Feral', 'Restoration'],
// };