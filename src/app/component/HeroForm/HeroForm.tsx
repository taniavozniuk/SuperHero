import { useState } from "react";
import styles from "./HeroForm.module.css";
import { heroPost } from "@/app/api/superheroes/api";
import { HeroCreate } from "@/types/HeroCreate";

interface HeroFromProps {
  setCreate: (value: boolean) => void;
}

const HeroFrom: React.FC<HeroFromProps> = ({ setCreate }) => {
  //#region Nickname
  const [nickName, setNickName] = useState("");
  const [hasNickNameError, setHasNickNameError] = useState(false);
  const [errorNickName, setErrorNickName] = useState("");
  //#endregion

  //#region RealName
  const [realName, setRealName] = useState("");
  const [hasRealNameError, setHasRealNameError] = useState(false);
  const [errorRealName, setErrorRealName] = useState("");
  //#endregion

  //#region Description
  const [description, setDescription] = useState("");
  const [hasDescriptionError, setHasDescriptionError] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  //#endregion

  //#region Superpower
  const [superpower, setSuperpower] = useState("");
  const [hasSuperpowerError, setHasSuperpowerError] = useState(false);
  const [errorSuperpower, setErrorSuperpower] = useState("");
  //#endregion

  //#region Phrase
  const [phrase, setPhrase] = useState("");
  const [hasPhraseError, setHasPhraseError] = useState(false);
  const [errorPhrase, setErrorPhrase] = useState("");
  //#endregion

  const [file, setFile] = useState<File | null>(null);

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNickName(value);
    setHasNickNameError(false);
    setErrorNickName("");
  };
  const handleReaclNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setRealName(value);
    setHasRealNameError(false);
    setErrorRealName("");
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    setHasDescriptionError(false);
    setErrorDescription("");
  };
  const handleSuperpowerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setSuperpower(value);
    setHasSuperpowerError(false);
    setErrorSuperpower("");
  };
  const handlePhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhrase(value);
    setHasPhraseError(false);
    setErrorPhrase("");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickName.trim()) {
      setHasNickNameError(true);
      setErrorNickName("NickName is required");
      return;
    }
    if (!realName.trim()) {
      setHasRealNameError(true);
      setErrorRealName("RealName is required");
      return;
    }
    if (!description.trim()) {
      setHasDescriptionError(true);
      setErrorDescription("Description is required");
      return;
    }
    if (!superpower.trim()) {
      setHasSuperpowerError(true);
      setErrorSuperpower("Superpower is required");
      return;
    }
    if (!phrase.trim()) {
      setHasPhraseError(true);
      setErrorPhrase("NickName is required");
      return;
    }

    const heroData: HeroCreate = {
      nickname: nickName,
      real_name: realName,
      origin_description: description,
      superpower,
      catch_phrase: phrase,
      images: [],
    };

    const createdHero = await heroPost(heroData, file);
    if (createdHero) {
      setNickName("");
      setRealName("");
      setDescription("");
      setSuperpower("");
      setPhrase("");
      setFile(null);
      alert("Hero created successfully!");
    }

    setHasNickNameError(false);
    setHasRealNameError(false);
    setHasDescriptionError(false);
    setHasSuperpowerError(false);
    setHasPhraseError(false);
  };

  const handleClear = () => {
    setNickName("");
    setRealName("");
    setDescription("");
    setSuperpower("");
    setPhrase("");
    setFile(null);
    setHasNickNameError(false);
    setHasRealNameError(false);
    setHasDescriptionError(false);
    setHasSuperpowerError(false);
    setHasPhraseError(false);
  };

  return (
    <form className={styles.form} onSubmit={handleCreate}>
      <div className={styles.wrap}>
        <h2 className={styles.fotmTitle}>Create a superhero</h2>
        <button
          className={styles.close}
          onClick={() => {
            setCreate(false);
          }}
        >
          x
          {/* <img src={Close.src} alt="close" className={styles.closeIcon} /> */}
        </button>
      </div>

      <div className={styles.createHero}>
        <div className={styles.fieldInfo}>
          <label className={styles.information} htmlFor="Nick-name">
            Nickname
          </label>

          <div className={styles.infoBox}>
            <input
              type="text"
              id="Nick-name"
              value={nickName}
              onChange={handleNickNameChange}
              placeholder="Nickname"
              className={styles.inputInfo}
            />
            {hasNickNameError && (
              <p className={styles.error}>{errorNickName}</p>
            )}
          </div>
        </div>

        <div className={styles.fieldInfo}>
          <label className={styles.information} htmlFor="Real-Name">
            Real Name
          </label>

          <div className={styles.infoBox}>
            <input
              type="text"
              id="Real-Name"
              value={realName}
              onChange={handleReaclNameChange}
              placeholder="Realname"
              className={styles.inputInfo}
            />
            {hasRealNameError && (
              <p className={styles.error}>{errorRealName}</p>
            )}
          </div>
        </div>

        <div className={styles.fieldInfo}>
          <label className={styles.information} htmlFor="des">
            Origin Description
          </label>

          <div className={styles.infoBox}>
            <textarea
              name="message"
              id="des"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Origin description"
              className={styles.textareaInfo}
            />
            {hasDescriptionError && (
              <p className={styles.error}>{errorDescription}</p>
            )}
          </div>
        </div>

        <div className={styles.fieldInfo}>
          <label className={styles.information} htmlFor="superpower">
            Superpower
          </label>

          <div className={styles.infoBox}>
            <textarea
              name="message"
              id="superpower"
              value={superpower}
              onChange={handleSuperpowerChange}
              placeholder="Superpower"
              className={styles.textareaInfo}
            />
            {hasSuperpowerError && (
              <p className={styles.error}>{errorSuperpower}</p>
            )}
          </div>
        </div>

        <div className={styles.fieldInfo}>
          <label className={styles.information} htmlFor="Catch-Phrase">
            Catch phrase
          </label>

          <div className={styles.infoBox}>
            <input
              type="text"
              id="Catch-Phrase"
              value={phrase}
              onChange={handlePhraseChange}
              placeholder="Catch phrase"
              className={styles.inputInfo}
            />
            {hasPhraseError && <p className={styles.error}>{errorPhrase}</p>}
          </div>
        </div>

        <div className={styles.fieldInfo}>
          <label className={styles.information} htmlFor="photo">
            Upload photo
          </label>
          <div className={styles.infoBox}>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className={styles.buttonWrap}>
          <button className={styles.create} type="submit">
            Create
          </button>
          <button className={styles.clear} onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeroFrom;
