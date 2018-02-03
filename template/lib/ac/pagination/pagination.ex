defmodule Ac.Pagination do
    
    def pagination_numbers(page_number, total_pages) do
    
        if page_number > 0 do
            page_number = String.to_integer(page_number)
        end 

        if page_number == 0 or page_number == 1 do
            starting_position = 1
            ending_position = ending_position(starting_position, total_pages)
            pagination_numbers = Enum.to_list(starting_position..ending_position)
        else      
            page_position = rem(page_number, 5) # 0 or 5
            starting_position = (page_number - page_position) + 1 
            ending_position = ending_position(starting_position, total_pages)
            pagination_numbers = Enum.to_list(starting_position..ending_position)
        end   

        left_arrow = left_arrow(page_number, total_pages)
        right_arrow = right_arrow(page_number, total_pages)
        
        {pagination_numbers, page_number, left_arrow, right_arrow}

    end

    def left_arrow(page_number, total_pages) do
        cond do 
            (page_number == 1 and total_pages == 1) ->
                0
            (page_number == 1 and total_pages > 1) ->
                1
            true -> 
                page_number + 1
        end
    end

    def right_arrow(page_number, total_pages) do
        cond do 
            (total_pages < 5) ->
                total_pages - 1
            (total_pages == 1 or page_number == total_pages) ->
                1 
            true ->
                page_number + 1
        end
    end

    def ending_position(starting_position, total_pages) do
        if total_pages < 5 do
            total_pages - 1
        else 
            starting_position + 5
        end
    end
end