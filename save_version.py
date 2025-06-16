import os
import shutil
import subprocess

# Считываем текущую версию
with open("VERSION", "r") as f:
    current_version = f.read().strip()

# Увеличиваем версию
major, minor, patch = map(int, current_version.split('.'))
patch += 1
new_version = f"{major}.{minor}.{patch}"

# Обновляем файл VERSION
with open("VERSION", "w") as f:
    f.write(new_version)

# Создаём новую папку под эту версию
new_dir = os.path.join(os.getcwd(), new_version)
os.makedirs(new_dir, exist_ok=True)

# Копируем важные файлы и папки
for item in ["client", "server", "docker-compose.yml"]:
    if os.path.isdir(item):
        shutil.copytree(item, os.path.join(new_dir, item))
    elif os.path.isfile(item):
        shutil.copy2(item, new_dir)

# Git commit и push
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", f"Save version {new_version}"])
subprocess.run(["git", "push", "origin", "main"])

print(f"✅ Project saved as version {new_version}")
