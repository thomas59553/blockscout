defmodule BlockScoutWeb.Chain.TransferHistoryChartHomeController do
  use BlockScoutWeb, :controller

  alias Explorer.{Chain}

  def show(conn, _params) do
    json(conn, %{
      transfer_data: to_string(transfer_data())
    })
  end


  defp transfer_data() do
    case Chain.count_transfers_per_day_from_cache do
      "" -> []
      cache -> cache
    end
    |> Jason.encode()
    |> case do
      {:ok, data} -> data
      _ -> []
    end
  end
end
