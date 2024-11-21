import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

import { Button } from "../components/Button";
import { SourceDetails, useSourcePower } from "../hooks/useSourcePower";
import { AsyncData } from "../types/AsyncData";

export function PowerDetails() {
  const { powerSource } = useParams();
  const { getDetails } = useSourcePower();

  const [data, setData] = useState<AsyncData<SourceDetails>>({
    type: 'LOADING',
  });

  useEffect(() => {
    if (powerSource) {
      getDetails(powerSource).then((data) => {
        setData({ type: 'SUCCESS', data });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const powers = data.type === 'SUCCESS' ? data.data.powers : [];

  if (!powerSource) return <p>Falha ao obter a Fonte de Luz</p>
  return (
    <div>
      <header className="flex flex-col gap-8 pl-8 md:pl-0 md:pt-8">
        <Link to="..">
          <MdArrowBack size={20} />
        </Link>

        <div className="flex justify-between">
          <h1 className="text-4xl font-medium">
            {data.type === 'SUCCESS' ? data.data.label : ''}
          </h1>

          <Button>+ Novo</Button>
        </div>

        <ul className="flex flex-col gap-2">
          {powers.map(power => (
            <li key={power.id} className="flex justify-between items-center">
              {power.label}

              <button
                type="button"
                className={classNames(
                  'px-4 py-1 rounded border border-white border-opacity-25',
                  'hover:bg-[#383935]  transition-opacity text-white',
                  !power.status && 'text-opacity-50'
                )}
              >
                {power.status ? 'desligar' : 'ligar'}
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}
