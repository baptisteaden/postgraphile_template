# This will recurse all sub-directories inside /docker-entrypoint-initdb.d/ and run the files the same way the original Dockerfile do
# Note that this script is executed AFTER the sql files that are directly in /docker-entrypoint-initdb.d

find /docker-entrypoint-initdb.d -mindepth 2 -type f -print0 | sort -z | while read -d $'\0' f; do
  case "$f" in
    *.sh)
      if [ -x "$f" ]; then
        echo "$0: running $f"
        "$f"
      else
        echo "$0: sourcing $f"
        . "$f"
      fi
      ;;
    *.sql)    echo "$0: running $f"; "${psql[@]}" -f "$f"; echo ;;
    *.sql.gz) echo "$0: running $f"; gunzip -c "$f" | "${psql[@]}"; echo ;;
    *)        echo "$0: ignoring $f" ;;
  esac
  echo
done