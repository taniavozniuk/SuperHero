import styles from "./HeroForm.module.css";
import { Hero } from "@/types/Hero";
import { useFormHook } from "./useFormHook";

interface HeroFromProps {
  setCreate: (value: boolean) => void;
  fetchHero: () => void;
  edit: Hero | null;
  setEdit: () => void;
}

const HeroFrom: React.FC<HeroFromProps> = ({
  setCreate,
  fetchHero,
  edit,
}) => {
  const {
    nickName,
    hasNickNameError,
    errorNickName,
    realName,
    hasRealNameError,
    errorRealName,
    description,
    hasDescriptionError,
    errorDescription,
    superpower,
    hasSuperpowerError,
    errorSuperpower,
    phrase,
    handleNickNameChange,
    handleReaclNameChange,
    handleDescriptionChange,
    handleSuperpowerChange,
    handlePhraseChange,
    hasPhraseError,
    errorPhrase,
    // file,
    setFile,
    handleCreate,
    handleClear,
  } = useFormHook({ edit, fetchHero});

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
            {edit ? "Update" : "Create"}
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
