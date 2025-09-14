import { heroPost, heroUpdate } from "@/app/api/superheroes/api";
import { Hero } from "@/types/Hero";
import { HeroCreate } from "@/types/HeroCreate";
import React, { useEffect, useState } from "react";

interface useFormHookProps {
  edit: Hero | null;
  fetchHero: () => void;
}

export const useFormHook = ({
  edit,
  fetchHero,
}: useFormHookProps) => {
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

  useEffect(() => {
    if (edit) {
      setNickName(edit.nickname);
      setRealName(edit.real_name);
      setDescription(edit.origin_description);
      setSuperpower(edit.superpower);
      setPhrase(edit.catch_phrase);
    }
  }, [edit]);

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

    if (edit) {
      await heroUpdate(edit.id, heroData);
      fetchHero();
    } else {
      const createdHero = await heroPost(heroData, file);
      if (createdHero) {
        setNickName("");
        setRealName("");
        setDescription("");
        setSuperpower("");
        setPhrase("");
        setFile(null);
        fetchHero();
      }
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

  return {
    nickName,
    setNickName,
    hasNickNameError,
    errorNickName,
    realName,
    setRealName,
    hasRealNameError,
    errorRealName,
    description,
    setDescription,
    hasDescriptionError,
    errorDescription,
    superpower,
    setSuperpower,
    hasSuperpowerError,
    errorSuperpower,
    phrase,
    setPhrase,
    hasPhraseError,
    errorPhrase,
    file,
    setFile,
    handleNickNameChange,
    handleReaclNameChange,
    handleDescriptionChange,
    handleSuperpowerChange,
    handlePhraseChange,
    handleCreate,
    handleClear,
  };
};
