export function checkCompatibility(camera, film) {
  if (!camera || !film || camera.type !== "camera" || film.type !== "film")
    return { ok: false, message: "Выберите камеру и плёнку." };
  const ok = camera.format === film.format;
  return {
    ok,
    message: ok
      ? `Оба используют формат ${camera.format}. Можно снимать.`
      : `Камере нужен формат ${camera.format}, выбрана плёнка ${film.format}.`,
  };
}
