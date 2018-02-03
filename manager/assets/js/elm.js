
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode = _elm_lang$core$Json_Decode$succeed;
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$resolve = _elm_lang$core$Json_Decode$andThen(_elm_lang$core$Basics$identity);
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom = _elm_lang$core$Json_Decode$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$hardcoded = function (_p0) {
	return _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom(
		_elm_lang$core$Json_Decode$succeed(_p0));
};
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return _elm_lang$core$Json_Decode$oneOf(
				{
					ctor: '::',
					_0: decoder,
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Json_Decode$null(fallback),
						_1: {ctor: '[]'}
					}
				});
		};
		var handleResult = function (input) {
			var _p1 = A2(_elm_lang$core$Json_Decode$decodeValue, pathDecoder, input);
			if (_p1.ctor === 'Ok') {
				var _p2 = A2(
					_elm_lang$core$Json_Decode$decodeValue,
					nullOr(valDecoder),
					_p1._0);
				if (_p2.ctor === 'Ok') {
					return _elm_lang$core$Json_Decode$succeed(_p2._0);
				} else {
					return _elm_lang$core$Json_Decode$fail(_p2._0);
				}
			} else {
				return _elm_lang$core$Json_Decode$succeed(fallback);
			}
		};
		return A2(_elm_lang$core$Json_Decode$andThen, handleResult, _elm_lang$core$Json_Decode$value);
	});
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optionalAt = F4(
	function (path, valDecoder, fallback, decoder) {
		return A2(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optionalDecoder,
				A2(_elm_lang$core$Json_Decode$at, path, _elm_lang$core$Json_Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optionalDecoder,
				A2(_elm_lang$core$Json_Decode$field, key, _elm_lang$core$Json_Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$requiredAt = F3(
	function (path, valDecoder, decoder) {
		return A2(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom,
			A2(_elm_lang$core$Json_Decode$at, path, valDecoder),
			decoder);
	});
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom,
			A2(_elm_lang$core$Json_Decode$field, key, valDecoder),
			decoder);
	});

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _elm_lang$dom$Native_Dom = function() {

var fakeNode = {
	addEventListener: function() {},
	removeEventListener: function() {}
};

var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(onDocument),
	onWindow: F3(onWindow),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

//import Result //

var _elm_lang$core$Native_Date = function() {

function fromString(str)
{
	var date = new Date(str);
	return isNaN(date.getTime())
		? _elm_lang$core$Result$Err('Unable to parse \'' + str + '\' as a date. Dates must be in the ISO 8601 format.')
		: _elm_lang$core$Result$Ok(date);
}

var dayTable = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthTable =
	['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


return {
	fromString: fromString,
	year: function(d) { return d.getFullYear(); },
	month: function(d) { return { ctor: monthTable[d.getMonth()] }; },
	day: function(d) { return d.getDate(); },
	hour: function(d) { return d.getHours(); },
	minute: function(d) { return d.getMinutes(); },
	second: function(d) { return d.getSeconds(); },
	millisecond: function(d) { return d.getMilliseconds(); },
	toTime: function(d) { return d.getTime(); },
	fromTime: function(t) { return new Date(t); },
	dayOfWeek: function(d) { return { ctor: dayTable[d.getDay()] }; }
};

}();
var _elm_lang$core$Date$millisecond = _elm_lang$core$Native_Date.millisecond;
var _elm_lang$core$Date$second = _elm_lang$core$Native_Date.second;
var _elm_lang$core$Date$minute = _elm_lang$core$Native_Date.minute;
var _elm_lang$core$Date$hour = _elm_lang$core$Native_Date.hour;
var _elm_lang$core$Date$dayOfWeek = _elm_lang$core$Native_Date.dayOfWeek;
var _elm_lang$core$Date$day = _elm_lang$core$Native_Date.day;
var _elm_lang$core$Date$month = _elm_lang$core$Native_Date.month;
var _elm_lang$core$Date$year = _elm_lang$core$Native_Date.year;
var _elm_lang$core$Date$fromTime = _elm_lang$core$Native_Date.fromTime;
var _elm_lang$core$Date$toTime = _elm_lang$core$Native_Date.toTime;
var _elm_lang$core$Date$fromString = _elm_lang$core$Native_Date.fromString;
var _elm_lang$core$Date$now = A2(_elm_lang$core$Task$map, _elm_lang$core$Date$fromTime, _elm_lang$core$Time$now);
var _elm_lang$core$Date$Date = {ctor: 'Date'};
var _elm_lang$core$Date$Sun = {ctor: 'Sun'};
var _elm_lang$core$Date$Sat = {ctor: 'Sat'};
var _elm_lang$core$Date$Fri = {ctor: 'Fri'};
var _elm_lang$core$Date$Thu = {ctor: 'Thu'};
var _elm_lang$core$Date$Wed = {ctor: 'Wed'};
var _elm_lang$core$Date$Tue = {ctor: 'Tue'};
var _elm_lang$core$Date$Mon = {ctor: 'Mon'};
var _elm_lang$core$Date$Dec = {ctor: 'Dec'};
var _elm_lang$core$Date$Nov = {ctor: 'Nov'};
var _elm_lang$core$Date$Oct = {ctor: 'Oct'};
var _elm_lang$core$Date$Sep = {ctor: 'Sep'};
var _elm_lang$core$Date$Aug = {ctor: 'Aug'};
var _elm_lang$core$Date$Jul = {ctor: 'Jul'};
var _elm_lang$core$Date$Jun = {ctor: 'Jun'};
var _elm_lang$core$Date$May = {ctor: 'May'};
var _elm_lang$core$Date$Apr = {ctor: 'Apr'};
var _elm_lang$core$Date$Mar = {ctor: 'Mar'};
var _elm_lang$core$Date$Feb = {ctor: 'Feb'};
var _elm_lang$core$Date$Jan = {ctor: 'Jan'};

var _elm_community$elm_datepicker$DatePicker_Date$yearRange = F2(
	function (_p0, range) {
		var _p1 = _p0;
		var _p5 = _p1.focused;
		var _p4 = _p1.currentMonth;
		var _p2 = range;
		switch (_p2.ctor) {
			case 'MoreOrLess':
				var _p3 = _p2._0;
				return A2(
					_elm_lang$core$List$range,
					_elm_lang$core$Date$year(_p4) - _p3,
					_elm_lang$core$Date$year(_p4) + _p3);
			case 'Between':
				return A2(_elm_lang$core$List$range, _p2._0, _p2._1);
			case 'From':
				return A2(
					_elm_lang$core$List$range,
					_p2._0,
					_elm_lang$core$Date$year(_p5));
			case 'To':
				return A2(
					_elm_lang$core$List$range,
					_elm_lang$core$Date$year(_p5),
					_p2._0);
			default:
				return {ctor: '[]'};
		}
	});
var _elm_community$elm_datepicker$DatePicker_Date$unsafeDate = function (date) {
	var _p6 = _elm_lang$core$Date$fromString(date);
	if (_p6.ctor === 'Err') {
		return _elm_lang$core$Native_Utils.crashCase(
			'DatePicker.Date',
			{
				start: {line: 552, column: 5},
				end: {line: 557, column: 17}
			},
			_p6)(
			A2(_elm_lang$core$Basics_ops['++'], 'unsafeDate: failed to parse date:', _p6._0));
	} else {
		return _p6._0;
	}
};
var _elm_community$elm_datepicker$DatePicker_Date$isLeapYear = function (y) {
	return _elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$Basics_ops['%'], y, 400),
		0) || ((!_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$Basics_ops['%'], y, 100),
		0)) && _elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$Basics_ops['%'], y, 4),
		0));
};
var _elm_community$elm_datepicker$DatePicker_Date$daysInMonth = F2(
	function (year, month) {
		var _p8 = month;
		switch (_p8.ctor) {
			case 'Jan':
				return 31;
			case 'Feb':
				return _elm_community$elm_datepicker$DatePicker_Date$isLeapYear(year) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var _elm_community$elm_datepicker$DatePicker_Date$monthFromInt = function (month) {
	var _p9 = month;
	switch (_p9) {
		case 1:
			return _elm_lang$core$Date$Jan;
		case 2:
			return _elm_lang$core$Date$Feb;
		case 3:
			return _elm_lang$core$Date$Mar;
		case 4:
			return _elm_lang$core$Date$Apr;
		case 5:
			return _elm_lang$core$Date$May;
		case 6:
			return _elm_lang$core$Date$Jun;
		case 7:
			return _elm_lang$core$Date$Jul;
		case 8:
			return _elm_lang$core$Date$Aug;
		case 9:
			return _elm_lang$core$Date$Sep;
		case 10:
			return _elm_lang$core$Date$Oct;
		case 11:
			return _elm_lang$core$Date$Nov;
		case 12:
			return _elm_lang$core$Date$Dec;
		default:
			return _elm_lang$core$Native_Utils.crashCase(
				'DatePicker.Date',
				{
					start: {line: 451, column: 5},
					end: {line: 489, column: 72}
				},
				_p9)(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'monthFromInt: invalid month: ',
					_elm_lang$core$Basics$toString(_p9)));
	}
};
var _elm_community$elm_datepicker$DatePicker_Date$monthToInt = function (month) {
	var _p11 = month;
	switch (_p11.ctor) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var _elm_community$elm_datepicker$DatePicker_Date$succMonth = function (month) {
	return _elm_community$elm_datepicker$DatePicker_Date$monthFromInt(
		A2(
			F2(
				function (x, y) {
					return x + y;
				}),
			1,
			A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$Basics$rem,
				12,
				_elm_community$elm_datepicker$DatePicker_Date$monthToInt(month))));
};
var _elm_community$elm_datepicker$DatePicker_Date$predMonth = function (month) {
	var prev = A3(
		_elm_lang$core$Basics$flip,
		_elm_lang$core$Basics$rem,
		12,
		_elm_community$elm_datepicker$DatePicker_Date$monthToInt(month) - 1);
	return _elm_lang$core$Native_Utils.eq(prev, 0) ? _elm_lang$core$Date$Dec : _elm_community$elm_datepicker$DatePicker_Date$monthFromInt(prev);
};
var _elm_community$elm_datepicker$DatePicker_Date$monthToString = function (month) {
	var $int = _elm_community$elm_datepicker$DatePicker_Date$monthToInt(month);
	return (_elm_lang$core$Native_Utils.cmp($int, 10) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'0',
		_elm_lang$core$Basics$toString($int)) : _elm_lang$core$Basics$toString($int);
};
var _elm_community$elm_datepicker$DatePicker_Date$dayFromInt = function (day) {
	var _p12 = day;
	switch (_p12) {
		case 1:
			return _elm_lang$core$Date$Mon;
		case 2:
			return _elm_lang$core$Date$Tue;
		case 3:
			return _elm_lang$core$Date$Wed;
		case 4:
			return _elm_lang$core$Date$Thu;
		case 5:
			return _elm_lang$core$Date$Fri;
		case 6:
			return _elm_lang$core$Date$Sat;
		case 7:
			return _elm_lang$core$Date$Sun;
		default:
			return _elm_lang$core$Native_Utils.crashCase(
				'DatePicker.Date',
				{
					start: {line: 350, column: 5},
					end: {line: 373, column: 70}
				},
				_p12)(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'dayFromInt: invalid day: ',
					_elm_lang$core$Basics$toString(day)));
	}
};
var _elm_community$elm_datepicker$DatePicker_Date$dayToInt = function (day) {
	var _p14 = day;
	switch (_p14.ctor) {
		case 'Mon':
			return 1;
		case 'Tue':
			return 2;
		case 'Wed':
			return 3;
		case 'Thu':
			return 4;
		case 'Fri':
			return 5;
		case 'Sat':
			return 6;
		default:
			return 7;
	}
};
var _elm_community$elm_datepicker$DatePicker_Date$dayToString = function (day) {
	return (_elm_lang$core$Native_Utils.cmp(day, 10) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'0',
		_elm_lang$core$Basics$toString(day)) : _elm_lang$core$Basics$toString(day);
};
var _elm_community$elm_datepicker$DatePicker_Date$mkDate = F3(
	function (year, month, day) {
		return _elm_community$elm_datepicker$DatePicker_Date$unsafeDate(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(year),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'/',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_community$elm_datepicker$DatePicker_Date$monthToString(month),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'/',
							_elm_community$elm_datepicker$DatePicker_Date$dayToString(day))))));
	});
var _elm_community$elm_datepicker$DatePicker_Date$newYear = F2(
	function (currentMonth, newYear) {
		var _p15 = _elm_lang$core$String$toInt(newYear);
		if (_p15.ctor === 'Ok') {
			return A3(
				_elm_community$elm_datepicker$DatePicker_Date$mkDate,
				_p15._0,
				_elm_lang$core$Date$month(currentMonth),
				_elm_lang$core$Date$day(currentMonth));
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'DatePicker.Date',
				{
					start: {line: 562, column: 5},
					end: {line: 567, column: 70}
				},
				_p15)(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Unknown Month ',
					_elm_lang$core$Basics$toString(currentMonth)));
		}
	});
var _elm_community$elm_datepicker$DatePicker_Date$predDow = function (day) {
	var prev = A3(
		_elm_lang$core$Basics$flip,
		_elm_lang$core$Basics$rem,
		7,
		_elm_community$elm_datepicker$DatePicker_Date$dayToInt(day) - 1);
	return _elm_lang$core$Native_Utils.eq(prev, 0) ? _elm_lang$core$Date$Sun : _elm_community$elm_datepicker$DatePicker_Date$dayFromInt(prev);
};
var _elm_community$elm_datepicker$DatePicker_Date$succDow = function (day) {
	return _elm_community$elm_datepicker$DatePicker_Date$dayFromInt(
		A2(
			F2(
				function (x, y) {
					return x + y;
				}),
			1,
			A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$Basics$rem,
				7,
				_elm_community$elm_datepicker$DatePicker_Date$dayToInt(day))));
};
var _elm_community$elm_datepicker$DatePicker_Date$subDay = function (date) {
	var day = _elm_lang$core$Date$day(date) - 1;
	var year = _elm_lang$core$Date$year(date);
	var month = _elm_lang$core$Date$month(date);
	var pred = _elm_community$elm_datepicker$DatePicker_Date$predMonth(month);
	var predYear = _elm_lang$core$Native_Utils.eq(pred, _elm_lang$core$Date$Dec) ? (year - 1) : year;
	return (_elm_lang$core$Native_Utils.cmp(day, 1) < 0) ? A3(
		_elm_community$elm_datepicker$DatePicker_Date$mkDate,
		predYear,
		pred,
		A2(_elm_community$elm_datepicker$DatePicker_Date$daysInMonth, predYear, pred)) : A3(_elm_community$elm_datepicker$DatePicker_Date$mkDate, year, month, day);
};
var _elm_community$elm_datepicker$DatePicker_Date$addDay = function (date) {
	var day = _elm_lang$core$Date$day(date) + 1;
	var year = _elm_lang$core$Date$year(date);
	var month = _elm_lang$core$Date$month(date);
	var dim = A2(_elm_community$elm_datepicker$DatePicker_Date$daysInMonth, year, month);
	var succ = _elm_community$elm_datepicker$DatePicker_Date$succMonth(month);
	var succYear = _elm_lang$core$Native_Utils.eq(succ, _elm_lang$core$Date$Jan) ? (year + 1) : year;
	return (_elm_lang$core$Native_Utils.cmp(day, dim) > 0) ? A3(_elm_community$elm_datepicker$DatePicker_Date$mkDate, succYear, succ, 1) : A3(_elm_community$elm_datepicker$DatePicker_Date$mkDate, year, month, day);
};
var _elm_community$elm_datepicker$DatePicker_Date$prevMonth = function (date) {
	var prevMonth = _elm_community$elm_datepicker$DatePicker_Date$predMonth(
		_elm_lang$core$Date$month(date));
	var prevYear = _elm_lang$core$Native_Utils.eq(prevMonth, _elm_lang$core$Date$Dec) ? (_elm_lang$core$Date$year(date) - 1) : _elm_lang$core$Date$year(date);
	return A3(_elm_community$elm_datepicker$DatePicker_Date$mkDate, prevYear, prevMonth, 1);
};
var _elm_community$elm_datepicker$DatePicker_Date$nextMonth = function (date) {
	var nextMonth = _elm_community$elm_datepicker$DatePicker_Date$succMonth(
		_elm_lang$core$Date$month(date));
	var nextYear = _elm_lang$core$Native_Utils.eq(nextMonth, _elm_lang$core$Date$Jan) ? (_elm_lang$core$Date$year(date) + 1) : _elm_lang$core$Date$year(date);
	return A3(_elm_community$elm_datepicker$DatePicker_Date$mkDate, nextYear, nextMonth, 1);
};
var _elm_community$elm_datepicker$DatePicker_Date$firstOfMonth = function (date) {
	return A3(
		_elm_community$elm_datepicker$DatePicker_Date$mkDate,
		_elm_lang$core$Date$year(date),
		_elm_lang$core$Date$month(date),
		1);
};
var _elm_community$elm_datepicker$DatePicker_Date$repeat = function (f) {
	var go = F2(
		function (n, x) {
			go:
			while (true) {
				if (_elm_lang$core$Native_Utils.eq(n, 0)) {
					return x;
				} else {
					var _v9 = n - 1,
						_v10 = f(x);
					n = _v9;
					x = _v10;
					continue go;
				}
			}
		});
	return go;
};
var _elm_community$elm_datepicker$DatePicker_Date$addDays = _elm_community$elm_datepicker$DatePicker_Date$repeat(_elm_community$elm_datepicker$DatePicker_Date$addDay);
var _elm_community$elm_datepicker$DatePicker_Date$subDays = _elm_community$elm_datepicker$DatePicker_Date$repeat(_elm_community$elm_datepicker$DatePicker_Date$subDay);
var _elm_community$elm_datepicker$DatePicker_Date$addDows = _elm_community$elm_datepicker$DatePicker_Date$repeat(_elm_community$elm_datepicker$DatePicker_Date$succDow);
var _elm_community$elm_datepicker$DatePicker_Date$subDows = _elm_community$elm_datepicker$DatePicker_Date$repeat(_elm_community$elm_datepicker$DatePicker_Date$succDow);
var _elm_community$elm_datepicker$DatePicker_Date$dateTuple = function (date) {
	return {
		ctor: '_Tuple3',
		_0: _elm_lang$core$Date$year(date),
		_1: _elm_community$elm_datepicker$DatePicker_Date$monthToInt(
			_elm_lang$core$Date$month(date)),
		_2: _elm_lang$core$Date$day(date)
	};
};
var _elm_community$elm_datepicker$DatePicker_Date$trimDates = F2(
	function (firstDay, dates) {
		var dl = function (dates) {
			dl:
			while (true) {
				var _p17 = dates;
				if (_p17.ctor === '[]') {
					return {ctor: '[]'};
				} else {
					if (_elm_lang$core$Native_Utils.eq(
						_elm_lang$core$Date$dayOfWeek(_p17._0),
						firstDay)) {
						return dates;
					} else {
						var _v12 = _p17._1;
						dates = _v12;
						continue dl;
					}
				}
			}
		};
		var lastDay = _elm_community$elm_datepicker$DatePicker_Date$predDow(firstDay);
		var dr = function (dates) {
			dr:
			while (true) {
				var _p18 = dates;
				if (_p18.ctor === '[]') {
					return {ctor: '[]'};
				} else {
					if (_elm_lang$core$Native_Utils.eq(
						_elm_lang$core$Date$dayOfWeek(_p18._0),
						lastDay)) {
						return dates;
					} else {
						var _v14 = _p18._1;
						dates = _v14;
						continue dr;
					}
				}
			}
		};
		return _elm_lang$core$List$reverse(
			dr(
				_elm_lang$core$List$reverse(
					dl(dates))));
	});
var _elm_community$elm_datepicker$DatePicker_Date$datesInRange = F3(
	function (firstDay, min, max) {
		var go = F2(
			function (x, acc) {
				go:
				while (true) {
					var y = _elm_community$elm_datepicker$DatePicker_Date$subDay(x);
					if (_elm_lang$core$Native_Utils.eq(
						_elm_community$elm_datepicker$DatePicker_Date$dateTuple(y),
						_elm_community$elm_datepicker$DatePicker_Date$dateTuple(min))) {
						return {ctor: '::', _0: y, _1: acc};
					} else {
						var _v15 = y,
							_v16 = {ctor: '::', _0: y, _1: acc};
						x = _v15;
						acc = _v16;
						continue go;
					}
				}
			});
		return A2(
			_elm_community$elm_datepicker$DatePicker_Date$trimDates,
			firstDay,
			A2(
				go,
				max,
				{ctor: '[]'}));
	});
var _elm_community$elm_datepicker$DatePicker_Date$formatMonth = function (month) {
	var _p19 = month;
	switch (_p19.ctor) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var _elm_community$elm_datepicker$DatePicker_Date$formatDay = function (day) {
	var _p20 = day;
	switch (_p20.ctor) {
		case 'Mon':
			return 'Mo';
		case 'Tue':
			return 'Tu';
		case 'Wed':
			return 'We';
		case 'Thu':
			return 'Th';
		case 'Fri':
			return 'Fr';
		case 'Sat':
			return 'Sa';
		default:
			return 'Su';
	}
};
var _elm_community$elm_datepicker$DatePicker_Date$formatDate = function (date) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(
			_elm_lang$core$Date$year(date)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'/',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_community$elm_datepicker$DatePicker_Date$monthToString(
					_elm_lang$core$Date$month(date)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'/',
					_elm_community$elm_datepicker$DatePicker_Date$dayToString(
						_elm_lang$core$Date$day(date))))));
};
var _elm_community$elm_datepicker$DatePicker_Date$initDate = A3(_elm_community$elm_datepicker$DatePicker_Date$mkDate, 1992, _elm_lang$core$Date$May, 29);
var _elm_community$elm_datepicker$DatePicker_Date$To = function (a) {
	return {ctor: 'To', _0: a};
};
var _elm_community$elm_datepicker$DatePicker_Date$From = function (a) {
	return {ctor: 'From', _0: a};
};
var _elm_community$elm_datepicker$DatePicker_Date$Between = F2(
	function (a, b) {
		return {ctor: 'Between', _0: a, _1: b};
	});
var _elm_community$elm_datepicker$DatePicker_Date$MoreOrLess = function (a) {
	return {ctor: 'MoreOrLess', _0: a};
};
var _elm_community$elm_datepicker$DatePicker_Date$Off = {ctor: 'Off'};

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

var _elm_community$elm_datepicker$DatePicker_ops = _elm_community$elm_datepicker$DatePicker_ops || {};
_elm_community$elm_datepicker$DatePicker_ops['??>'] = F2(
	function (first, $default) {
		var _p0 = first;
		if (_p0.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(_p0._0);
		} else {
			return $default;
		}
	});
var _elm_community$elm_datepicker$DatePicker_ops = _elm_community$elm_datepicker$DatePicker_ops || {};
_elm_community$elm_datepicker$DatePicker_ops['?>'] = _elm_lang$core$Basics$flip(_elm_lang$core$Maybe$withDefault);
var _elm_community$elm_datepicker$DatePicker$mkClassList = F2(
	function (_p1, cs) {
		var _p2 = _p1;
		return _elm_lang$html$Html_Attributes$classList(
			A2(
				_elm_lang$core$List$map,
				function (_p3) {
					var _p4 = _p3;
					return {
						ctor: '_Tuple2',
						_0: A2(_elm_lang$core$Basics_ops['++'], _p2.classNamespace, _p4._0),
						_1: _p4._1
					};
				},
				cs));
	});
var _elm_community$elm_datepicker$DatePicker$mkClass = F2(
	function (_p5, c) {
		var _p6 = _p5;
		return _elm_lang$html$Html_Attributes$class(
			A2(_elm_lang$core$Basics_ops['++'], _p6.classNamespace, c));
	});
var _elm_community$elm_datepicker$DatePicker$groupDates = function (dates) {
	var go = F4(
		function (i, xs, racc, acc) {
			go:
			while (true) {
				var _p7 = xs;
				if (_p7.ctor === '[]') {
					return _elm_lang$core$List$reverse(acc);
				} else {
					var _p9 = _p7._1;
					var _p8 = _p7._0;
					if (_elm_lang$core$Native_Utils.eq(i, 6)) {
						var _v5 = 0,
							_v6 = _p9,
							_v7 = {ctor: '[]'},
							_v8 = {
							ctor: '::',
							_0: _elm_lang$core$List$reverse(
								{ctor: '::', _0: _p8, _1: racc}),
							_1: acc
						};
						i = _v5;
						xs = _v6;
						racc = _v7;
						acc = _v8;
						continue go;
					} else {
						var _v9 = i + 1,
							_v10 = _p9,
							_v11 = {ctor: '::', _0: _p8, _1: racc},
							_v12 = acc;
						i = _v9;
						xs = _v10;
						racc = _v11;
						acc = _v12;
						continue go;
					}
				}
			}
		});
	return A4(
		go,
		0,
		dates,
		{ctor: '[]'},
		{ctor: '[]'});
};
var _elm_community$elm_datepicker$DatePicker$focusedDate = function (_p10) {
	var _p11 = _p10;
	return _p11._0.focused;
};
var _elm_community$elm_datepicker$DatePicker$isOpen = function (_p12) {
	var _p13 = _p12;
	return _p13._0.open;
};
var _elm_community$elm_datepicker$DatePicker$prepareDates = F2(
	function (date, firstDayOfWeek) {
		var end = A2(
			_elm_community$elm_datepicker$DatePicker_Date$addDays,
			6,
			_elm_community$elm_datepicker$DatePicker_Date$nextMonth(date));
		var start = A2(
			_elm_community$elm_datepicker$DatePicker_Date$subDays,
			6,
			_elm_community$elm_datepicker$DatePicker_Date$firstOfMonth(date));
		return {
			currentMonth: date,
			currentDates: A3(_elm_community$elm_datepicker$DatePicker_Date$datesInRange, firstDayOfWeek, start, end)
		};
	});
var _elm_community$elm_datepicker$DatePicker$formatCell = function (day) {
	return _elm_lang$html$Html$text(day);
};
var _elm_community$elm_datepicker$DatePicker$off = _elm_community$elm_datepicker$DatePicker_Date$Off;
var _elm_community$elm_datepicker$DatePicker$to = function (year) {
	return _elm_community$elm_datepicker$DatePicker_Date$To(year);
};
var _elm_community$elm_datepicker$DatePicker$from = function (year) {
	return _elm_community$elm_datepicker$DatePicker_Date$From(year);
};
var _elm_community$elm_datepicker$DatePicker$moreOrLess = function (range) {
	return _elm_community$elm_datepicker$DatePicker_Date$MoreOrLess(range);
};
var _elm_community$elm_datepicker$DatePicker$between = F2(
	function (start, end) {
		return (_elm_lang$core$Native_Utils.cmp(start, end) > 0) ? A2(_elm_community$elm_datepicker$DatePicker_Date$Between, end, start) : A2(_elm_community$elm_datepicker$DatePicker_Date$Between, start, end);
	});
var _elm_community$elm_datepicker$DatePicker$yearRangeActive = function (yearRange) {
	return !_elm_lang$core$Native_Utils.eq(yearRange, _elm_community$elm_datepicker$DatePicker_Date$Off);
};
var _elm_community$elm_datepicker$DatePicker$defaultSettings = {
	placeholder: 'Please pick a date...',
	classNamespace: 'elm-datepicker--',
	inputClassList: {ctor: '[]'},
	inputName: _elm_lang$core$Maybe$Nothing,
	inputId: _elm_lang$core$Maybe$Nothing,
	inputAttributes: {
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$required(false),
		_1: {ctor: '[]'}
	},
	isDisabled: _elm_lang$core$Basics$always(false),
	parser: _elm_lang$core$Date$fromString,
	dateFormatter: _elm_community$elm_datepicker$DatePicker_Date$formatDate,
	dayFormatter: _elm_community$elm_datepicker$DatePicker_Date$formatDay,
	monthFormatter: _elm_community$elm_datepicker$DatePicker_Date$formatMonth,
	yearFormatter: _elm_lang$core$Basics$toString,
	cellFormatter: _elm_community$elm_datepicker$DatePicker$formatCell,
	firstDayOfWeek: _elm_lang$core$Date$Sun,
	changeYear: _elm_community$elm_datepicker$DatePicker$off
};
var _elm_community$elm_datepicker$DatePicker$Settings = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return {placeholder: a, classNamespace: b, inputClassList: c, inputName: d, inputId: e, inputAttributes: f, isDisabled: g, parser: h, dateFormatter: i, dayFormatter: j, monthFormatter: k, yearFormatter: l, cellFormatter: m, firstDayOfWeek: n, changeYear: o};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_community$elm_datepicker$DatePicker$Model = F5(
	function (a, b, c, d, e) {
		return {open: a, forceOpen: b, focused: c, inputText: d, today: e};
	});
var _elm_community$elm_datepicker$DatePicker$MouseUp = {ctor: 'MouseUp'};
var _elm_community$elm_datepicker$DatePicker$MouseDown = {ctor: 'MouseDown'};
var _elm_community$elm_datepicker$DatePicker$Blur = {ctor: 'Blur'};
var _elm_community$elm_datepicker$DatePicker$Focus = {ctor: 'Focus'};
var _elm_community$elm_datepicker$DatePicker$SubmitText = {ctor: 'SubmitText'};
var _elm_community$elm_datepicker$DatePicker$Text = function (a) {
	return {ctor: 'Text', _0: a};
};
var _elm_community$elm_datepicker$DatePicker$Pick = function (a) {
	return {ctor: 'Pick', _0: a};
};
var _elm_community$elm_datepicker$DatePicker$pick = _elm_community$elm_datepicker$DatePicker$Pick;
var _elm_community$elm_datepicker$DatePicker$ChangeFocus = function (a) {
	return {ctor: 'ChangeFocus', _0: a};
};
var _elm_community$elm_datepicker$DatePicker$datePicker = F3(
	function (pickedDate, settings, _p14) {
		var _p15 = _p14;
		var onChange = function (handler) {
			return A2(
				_elm_lang$html$Html_Events$on,
				'change',
				A2(_elm_lang$core$Json_Decode$map, handler, _elm_lang$html$Html_Events$targetValue));
		};
		var onPicker = function (ev) {
			return function (_p16) {
				return A3(
					_elm_lang$html$Html_Events$onWithOptions,
					ev,
					{preventDefault: false, stopPropagation: true},
					_elm_lang$core$Json_Decode$succeed(_p16));
			};
		};
		var picked = function (d) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				false,
				A2(
					_elm_lang$core$Maybe$map,
					function (_p17) {
						return A2(
							F2(
								function (x, y) {
									return _elm_lang$core$Native_Utils.eq(x, y);
								}),
							_elm_community$elm_datepicker$DatePicker_Date$dateTuple(d),
							_elm_community$elm_datepicker$DatePicker_Date$dateTuple(_p17));
					},
					pickedDate));
		};
		var firstDay = settings.firstDayOfWeek;
		var classList = _elm_community$elm_datepicker$DatePicker$mkClassList(settings);
		var $class = _elm_community$elm_datepicker$DatePicker$mkClass(settings);
		var arrow = F2(
			function (className, message) {
				return A2(
					_elm_lang$html$Html$a,
					{
						ctor: '::',
						_0: $class(className),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$href('javascript:;'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(message),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$tabindex(-1),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					{ctor: '[]'});
			});
		var dow = function (d) {
			return A2(
				_elm_lang$html$Html$td,
				{
					ctor: '::',
					_0: $class('dow'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						settings.dayFormatter(d)),
					_1: {ctor: '[]'}
				});
		};
		var currentDate = A2(
			_elm_community$elm_datepicker$DatePicker_ops['?>'],
			A2(_elm_community$elm_datepicker$DatePicker_ops['??>'], _p15.focused, pickedDate),
			_p15.today);
		var _p18 = A2(_elm_community$elm_datepicker$DatePicker$prepareDates, currentDate, settings.firstDayOfWeek);
		var currentMonth = _p18.currentMonth;
		var currentDates = _p18.currentDates;
		var isCurrentYear = function (selectedYear) {
			return _elm_lang$core$Native_Utils.eq(
				_elm_lang$core$Date$year(currentMonth),
				selectedYear);
		};
		var yearOption = F2(
			function (index, selectedYear) {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Basics$toString(index),
					_1: A2(
						_elm_lang$html$Html$option,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$value(
								_elm_lang$core$Basics$toString(selectedYear)),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$selected(
									isCurrentYear(selectedYear)),
								_1: {ctor: '[]'}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								_elm_lang$core$Basics$toString(selectedYear)),
							_1: {ctor: '[]'}
						})
				};
			});
		var day = function (d) {
			var disabled = settings.isDisabled(d);
			var props = (!disabled) ? {
				ctor: '::',
				_0: _elm_lang$html$Html_Events$onClick(
					_elm_community$elm_datepicker$DatePicker$Pick(
						_elm_lang$core$Maybe$Just(d))),
				_1: {ctor: '[]'}
			} : {ctor: '[]'};
			return A2(
				_elm_lang$html$Html$td,
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: classList(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'day', _1: true},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'disabled', _1: disabled},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'picked',
											_1: picked(d)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'today',
												_1: _elm_lang$core$Native_Utils.eq(
													_elm_community$elm_datepicker$DatePicker_Date$dateTuple(d),
													_elm_community$elm_datepicker$DatePicker_Date$dateTuple(currentDate))
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'other-month',
													_1: !_elm_lang$core$Native_Utils.eq(
														_elm_lang$core$Date$month(currentMonth),
														_elm_lang$core$Date$month(d))
												},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					},
					props),
				{
					ctor: '::',
					_0: settings.cellFormatter(
						_elm_lang$core$Basics$toString(
							_elm_lang$core$Date$day(d))),
					_1: {ctor: '[]'}
				});
		};
		var row = function (days) {
			return A2(
				_elm_lang$html$Html$tr,
				{
					ctor: '::',
					_0: $class('row'),
					_1: {ctor: '[]'}
				},
				A2(_elm_lang$core$List$map, day, days));
		};
		var days = A2(
			_elm_lang$core$List$map,
			row,
			_elm_community$elm_datepicker$DatePicker$groupDates(currentDates));
		var dropdownYear = A3(
			_elm_lang$html$Html_Keyed$node,
			'select',
			{
				ctor: '::',
				_0: onChange(
					function (_p19) {
						return _elm_community$elm_datepicker$DatePicker$ChangeFocus(
							A2(_elm_community$elm_datepicker$DatePicker_Date$newYear, currentDate, _p19));
					}),
				_1: {
					ctor: '::',
					_0: $class('year-menu'),
					_1: {ctor: '[]'}
				}
			},
			A2(
				_elm_lang$core$List$indexedMap,
				yearOption,
				A2(
					_elm_community$elm_datepicker$DatePicker_Date$yearRange,
					{focused: currentDate, currentMonth: currentMonth},
					settings.changeYear)));
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: $class('picker'),
				_1: {
					ctor: '::',
					_0: A2(onPicker, 'mousedown', _elm_community$elm_datepicker$DatePicker$MouseDown),
					_1: {
						ctor: '::',
						_0: A2(onPicker, 'mouseup', _elm_community$elm_datepicker$DatePicker$MouseUp),
						_1: {ctor: '[]'}
					}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: $class('picker-header'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: $class('prev-container'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									arrow,
									'prev',
									_elm_community$elm_datepicker$DatePicker$ChangeFocus(
										_elm_community$elm_datepicker$DatePicker_Date$prevMonth(currentDate))),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: $class('month-container'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$span,
										{
											ctor: '::',
											_0: $class('month'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text(
												settings.monthFormatter(
													_elm_lang$core$Date$month(currentMonth))),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$span,
											{
												ctor: '::',
												_0: $class('year'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: (!_elm_community$elm_datepicker$DatePicker$yearRangeActive(settings.changeYear)) ? _elm_lang$html$Html$text(
													settings.yearFormatter(
														_elm_lang$core$Date$year(currentMonth))) : A3(
													_elm_lang$html$Html_Keyed$node,
													'span',
													{ctor: '[]'},
													{
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: _elm_lang$core$Basics$toString(
																_elm_lang$core$Date$year(currentMonth)),
															_1: dropdownYear
														},
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: $class('next-container'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											arrow,
											'next',
											_elm_community$elm_datepicker$DatePicker$ChangeFocus(
												_elm_community$elm_datepicker$DatePicker_Date$nextMonth(currentDate))),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$table,
						{
							ctor: '::',
							_0: $class('table'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$thead,
								{
									ctor: '::',
									_0: $class('weekdays'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$tr,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: dow(firstDay),
											_1: {
												ctor: '::',
												_0: dow(
													A2(_elm_community$elm_datepicker$DatePicker_Date$addDows, 1, firstDay)),
												_1: {
													ctor: '::',
													_0: dow(
														A2(_elm_community$elm_datepicker$DatePicker_Date$addDows, 2, firstDay)),
													_1: {
														ctor: '::',
														_0: dow(
															A2(_elm_community$elm_datepicker$DatePicker_Date$addDows, 3, firstDay)),
														_1: {
															ctor: '::',
															_0: dow(
																A2(_elm_community$elm_datepicker$DatePicker_Date$addDows, 4, firstDay)),
															_1: {
																ctor: '::',
																_0: dow(
																	A2(_elm_community$elm_datepicker$DatePicker_Date$addDows, 5, firstDay)),
																_1: {
																	ctor: '::',
																	_0: dow(
																		A2(_elm_community$elm_datepicker$DatePicker_Date$addDows, 6, firstDay)),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$tbody,
									{
										ctor: '::',
										_0: $class('days'),
										_1: {ctor: '[]'}
									},
									days),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _elm_community$elm_datepicker$DatePicker$view = F3(
	function (pickedDate, settings, _p20) {
		var _p21 = _p20;
		var _p23 = _p21._0;
		var inputClasses = A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: A2(_elm_lang$core$Basics_ops['++'], settings.classNamespace, 'input'),
					_1: true
				},
				_1: {ctor: '[]'}
			},
			settings.inputClassList);
		var potentialInputId = function (_p22) {
			return A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				_elm_lang$core$List$singleton(_p22));
		}(
			A2(_elm_lang$core$Maybe$map, _elm_lang$html$Html_Attributes$id, settings.inputId));
		var inputCommon = function (xs) {
			return A2(
				_elm_lang$html$Html$input,
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$classList(inputClasses),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$name(
								A2(_elm_community$elm_datepicker$DatePicker_ops['?>'], settings.inputName, '')),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$type_('text'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html_Events$on,
										'change',
										_elm_lang$core$Json_Decode$succeed(_elm_community$elm_datepicker$DatePicker$SubmitText)),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(_elm_community$elm_datepicker$DatePicker$Text),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onBlur(_elm_community$elm_datepicker$DatePicker$Blur),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(_elm_community$elm_datepicker$DatePicker$Focus),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onFocus(_elm_community$elm_datepicker$DatePicker$Focus),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						settings.inputAttributes,
						A2(_elm_lang$core$Basics_ops['++'], potentialInputId, xs))),
				{ctor: '[]'});
		};
		var dateInput = inputCommon(
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$placeholder(settings.placeholder),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$value(
						A2(
							_elm_lang$core$Maybe$withDefault,
							A2(
								_elm_lang$core$Maybe$withDefault,
								'',
								A2(_elm_lang$core$Maybe$map, settings.dateFormatter, pickedDate)),
							_p23.inputText)),
					_1: {ctor: '[]'}
				}
			});
		var $class = _elm_community$elm_datepicker$DatePicker$mkClass(settings);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: $class('container'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: dateInput,
				_1: {
					ctor: '::',
					_0: _p21._0.open ? A3(_elm_community$elm_datepicker$DatePicker$datePicker, pickedDate, settings, _p23) : _elm_lang$html$Html$text(''),
					_1: {ctor: '[]'}
				}
			});
	});
var _elm_community$elm_datepicker$DatePicker$CurrentDate = function (a) {
	return {ctor: 'CurrentDate', _0: a};
};
var _elm_community$elm_datepicker$DatePicker$DatePicker = function (a) {
	return {ctor: 'DatePicker', _0: a};
};
var _elm_community$elm_datepicker$DatePicker$init = {
	ctor: '_Tuple2',
	_0: _elm_community$elm_datepicker$DatePicker$DatePicker(
		{
			open: false,
			forceOpen: false,
			focused: _elm_lang$core$Maybe$Just(_elm_community$elm_datepicker$DatePicker_Date$initDate),
			inputText: _elm_lang$core$Maybe$Nothing,
			today: _elm_community$elm_datepicker$DatePicker_Date$initDate
		}),
	_1: A2(_elm_lang$core$Task$perform, _elm_community$elm_datepicker$DatePicker$CurrentDate, _elm_lang$core$Date$now)
};
var _elm_community$elm_datepicker$DatePicker$initFromDate = function (date) {
	return _elm_community$elm_datepicker$DatePicker$DatePicker(
		{
			open: false,
			forceOpen: false,
			focused: _elm_lang$core$Maybe$Just(date),
			inputText: _elm_lang$core$Maybe$Nothing,
			today: date
		});
};
var _elm_community$elm_datepicker$DatePicker$initFromDates = F2(
	function (today, date) {
		return _elm_community$elm_datepicker$DatePicker$DatePicker(
			{open: false, forceOpen: false, focused: date, inputText: _elm_lang$core$Maybe$Nothing, today: today});
	});
var _elm_community$elm_datepicker$DatePicker$Changed = function (a) {
	return {ctor: 'Changed', _0: a};
};
var _elm_community$elm_datepicker$DatePicker$NoChange = {ctor: 'NoChange'};
var _elm_community$elm_datepicker$DatePicker_ops = _elm_community$elm_datepicker$DatePicker_ops || {};
_elm_community$elm_datepicker$DatePicker_ops['!'] = F2(
	function (m, cs) {
		return {
			ctor: '_Tuple3',
			_0: _elm_community$elm_datepicker$DatePicker$DatePicker(m),
			_1: _elm_lang$core$Platform_Cmd$batch(cs),
			_2: _elm_community$elm_datepicker$DatePicker$NoChange
		};
	});
var _elm_community$elm_datepicker$DatePicker$update = F3(
	function (settings, msg, _p24) {
		var _p25 = _p24;
		var _p33 = _p25._0;
		var _p26 = msg;
		switch (_p26.ctor) {
			case 'CurrentDate':
				var _p27 = _p26._0;
				return A2(
					_elm_community$elm_datepicker$DatePicker_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p33,
						{
							focused: _elm_lang$core$Maybe$Just(_p27),
							today: _p27
						}),
					{ctor: '[]'});
			case 'ChangeFocus':
				return A2(
					_elm_community$elm_datepicker$DatePicker_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p33,
						{
							focused: _elm_lang$core$Maybe$Just(_p26._0)
						}),
					{ctor: '[]'});
			case 'Pick':
				return {
					ctor: '_Tuple3',
					_0: _elm_community$elm_datepicker$DatePicker$DatePicker(
						_elm_lang$core$Native_Utils.update(
							_p33,
							{open: false, inputText: _elm_lang$core$Maybe$Nothing, focused: _elm_lang$core$Maybe$Nothing})),
					_1: _elm_lang$core$Platform_Cmd$none,
					_2: _elm_community$elm_datepicker$DatePicker$Changed(_p26._0)
				};
			case 'Text':
				return A2(
					_elm_community$elm_datepicker$DatePicker_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p33,
						{
							inputText: _elm_lang$core$Maybe$Just(_p26._0)
						}),
					{ctor: '[]'});
			case 'SubmitText':
				var isWhitespace = function (_p28) {
					return _elm_lang$core$String$isEmpty(
						_elm_lang$core$String$trim(_p28));
				};
				var dateEvent = function () {
					var text = A2(_elm_community$elm_datepicker$DatePicker_ops['?>'], _p33.inputText, '');
					return isWhitespace(text) ? _elm_community$elm_datepicker$DatePicker$Changed(_elm_lang$core$Maybe$Nothing) : A2(
						_elm_lang$core$Result$withDefault,
						_elm_community$elm_datepicker$DatePicker$NoChange,
						A2(
							_elm_lang$core$Result$map,
							function (_p29) {
								return _elm_community$elm_datepicker$DatePicker$Changed(
									function (date) {
										return settings.isDisabled(date) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(date);
									}(_p29));
							},
							settings.parser(text)));
				}();
				return {
					ctor: '_Tuple3',
					_0: _elm_community$elm_datepicker$DatePicker$DatePicker(
						_elm_lang$core$Native_Utils.update(
							_p33,
							{
								inputText: function () {
									var _p30 = dateEvent;
									if (_p30.ctor === 'Changed') {
										return _elm_lang$core$Maybe$Nothing;
									} else {
										return _p33.inputText;
									}
								}(),
								focused: function () {
									var _p31 = dateEvent;
									if (_p31.ctor === 'Changed') {
										var _p32 = _p31._0;
										if (_p32.ctor === 'Just') {
											return _elm_lang$core$Maybe$Just(_p32._0);
										} else {
											return _elm_lang$core$Maybe$Nothing;
										}
									} else {
										return _p33.focused;
									}
								}()
							})),
					_1: _elm_lang$core$Platform_Cmd$none,
					_2: dateEvent
				};
			case 'Focus':
				return A2(
					_elm_community$elm_datepicker$DatePicker_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p33,
						{open: true, forceOpen: false}),
					{ctor: '[]'});
			case 'Blur':
				return A2(
					_elm_community$elm_datepicker$DatePicker_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p33,
						{open: _p25._0.forceOpen}),
					{ctor: '[]'});
			case 'MouseDown':
				return A2(
					_elm_community$elm_datepicker$DatePicker_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p33,
						{forceOpen: true}),
					{ctor: '[]'});
			default:
				return A2(
					_elm_community$elm_datepicker$DatePicker_ops['!'],
					_elm_lang$core$Native_Utils.update(
						_p33,
						{forceOpen: false}),
					{ctor: '[]'});
		}
	});

var _elm_community$json_extra$Json_Encode_Extra$dict = F3(
	function (toKey, toValue, dict) {
		return _elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$map,
				function (_p0) {
					var _p1 = _p0;
					return {
						ctor: '_Tuple2',
						_0: toKey(_p1._0),
						_1: toValue(_p1._1)
					};
				},
				_elm_lang$core$Dict$toList(dict)));
	});
var _elm_community$json_extra$Json_Encode_Extra$maybe = function (encoder) {
	return function (_p2) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			_elm_lang$core$Json_Encode$null,
			A2(_elm_lang$core$Maybe$map, encoder, _p2));
	};
};

var _elm_lang$core$Random$onSelfMsg = F3(
	function (_p1, _p0, seed) {
		return _elm_lang$core$Task$succeed(seed);
	});
var _elm_lang$core$Random$magicNum8 = 2147483562;
var _elm_lang$core$Random$range = function (_p2) {
	return {ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Random$magicNum8};
};
var _elm_lang$core$Random$magicNum7 = 2147483399;
var _elm_lang$core$Random$magicNum6 = 2147483563;
var _elm_lang$core$Random$magicNum5 = 3791;
var _elm_lang$core$Random$magicNum4 = 40692;
var _elm_lang$core$Random$magicNum3 = 52774;
var _elm_lang$core$Random$magicNum2 = 12211;
var _elm_lang$core$Random$magicNum1 = 53668;
var _elm_lang$core$Random$magicNum0 = 40014;
var _elm_lang$core$Random$step = F2(
	function (_p3, seed) {
		var _p4 = _p3;
		return _p4._0(seed);
	});
var _elm_lang$core$Random$onEffects = F3(
	function (router, commands, seed) {
		var _p5 = commands;
		if (_p5.ctor === '[]') {
			return _elm_lang$core$Task$succeed(seed);
		} else {
			var _p6 = A2(_elm_lang$core$Random$step, _p5._0._0, seed);
			var value = _p6._0;
			var newSeed = _p6._1;
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p7) {
					return A3(_elm_lang$core$Random$onEffects, router, _p5._1, newSeed);
				},
				A2(_elm_lang$core$Platform$sendToApp, router, value));
		}
	});
var _elm_lang$core$Random$listHelp = F4(
	function (list, n, generate, seed) {
		listHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 1) < 0) {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$reverse(list),
					_1: seed
				};
			} else {
				var _p8 = generate(seed);
				var value = _p8._0;
				var newSeed = _p8._1;
				var _v2 = {ctor: '::', _0: value, _1: list},
					_v3 = n - 1,
					_v4 = generate,
					_v5 = newSeed;
				list = _v2;
				n = _v3;
				generate = _v4;
				seed = _v5;
				continue listHelp;
			}
		}
	});
var _elm_lang$core$Random$minInt = -2147483648;
var _elm_lang$core$Random$maxInt = 2147483647;
var _elm_lang$core$Random$iLogBase = F2(
	function (b, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, b) < 0) ? 1 : (1 + A2(_elm_lang$core$Random$iLogBase, b, (i / b) | 0));
	});
var _elm_lang$core$Random$command = _elm_lang$core$Native_Platform.leaf('Random');
var _elm_lang$core$Random$Generator = function (a) {
	return {ctor: 'Generator', _0: a};
};
var _elm_lang$core$Random$list = F2(
	function (n, _p9) {
		var _p10 = _p9;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				return A4(
					_elm_lang$core$Random$listHelp,
					{ctor: '[]'},
					n,
					_p10._0,
					seed);
			});
	});
var _elm_lang$core$Random$map = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p13 = _p12._0(seed0);
				var a = _p13._0;
				var seed1 = _p13._1;
				return {
					ctor: '_Tuple2',
					_0: func(a),
					_1: seed1
				};
			});
	});
var _elm_lang$core$Random$map2 = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p18 = _p16._0(seed0);
				var a = _p18._0;
				var seed1 = _p18._1;
				var _p19 = _p17._0(seed1);
				var b = _p19._0;
				var seed2 = _p19._1;
				return {
					ctor: '_Tuple2',
					_0: A2(func, a, b),
					_1: seed2
				};
			});
	});
var _elm_lang$core$Random$pair = F2(
	function (genA, genB) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			genA,
			genB);
	});
var _elm_lang$core$Random$map3 = F4(
	function (func, _p22, _p21, _p20) {
		var _p23 = _p22;
		var _p24 = _p21;
		var _p25 = _p20;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p26 = _p23._0(seed0);
				var a = _p26._0;
				var seed1 = _p26._1;
				var _p27 = _p24._0(seed1);
				var b = _p27._0;
				var seed2 = _p27._1;
				var _p28 = _p25._0(seed2);
				var c = _p28._0;
				var seed3 = _p28._1;
				return {
					ctor: '_Tuple2',
					_0: A3(func, a, b, c),
					_1: seed3
				};
			});
	});
var _elm_lang$core$Random$map4 = F5(
	function (func, _p32, _p31, _p30, _p29) {
		var _p33 = _p32;
		var _p34 = _p31;
		var _p35 = _p30;
		var _p36 = _p29;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p37 = _p33._0(seed0);
				var a = _p37._0;
				var seed1 = _p37._1;
				var _p38 = _p34._0(seed1);
				var b = _p38._0;
				var seed2 = _p38._1;
				var _p39 = _p35._0(seed2);
				var c = _p39._0;
				var seed3 = _p39._1;
				var _p40 = _p36._0(seed3);
				var d = _p40._0;
				var seed4 = _p40._1;
				return {
					ctor: '_Tuple2',
					_0: A4(func, a, b, c, d),
					_1: seed4
				};
			});
	});
var _elm_lang$core$Random$map5 = F6(
	function (func, _p45, _p44, _p43, _p42, _p41) {
		var _p46 = _p45;
		var _p47 = _p44;
		var _p48 = _p43;
		var _p49 = _p42;
		var _p50 = _p41;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p51 = _p46._0(seed0);
				var a = _p51._0;
				var seed1 = _p51._1;
				var _p52 = _p47._0(seed1);
				var b = _p52._0;
				var seed2 = _p52._1;
				var _p53 = _p48._0(seed2);
				var c = _p53._0;
				var seed3 = _p53._1;
				var _p54 = _p49._0(seed3);
				var d = _p54._0;
				var seed4 = _p54._1;
				var _p55 = _p50._0(seed4);
				var e = _p55._0;
				var seed5 = _p55._1;
				return {
					ctor: '_Tuple2',
					_0: A5(func, a, b, c, d, e),
					_1: seed5
				};
			});
	});
var _elm_lang$core$Random$andThen = F2(
	function (callback, _p56) {
		var _p57 = _p56;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p58 = _p57._0(seed);
				var result = _p58._0;
				var newSeed = _p58._1;
				var _p59 = callback(result);
				var genB = _p59._0;
				return genB(newSeed);
			});
	});
var _elm_lang$core$Random$State = F2(
	function (a, b) {
		return {ctor: 'State', _0: a, _1: b};
	});
var _elm_lang$core$Random$initState = function (seed) {
	var s = A2(_elm_lang$core$Basics$max, seed, 0 - seed);
	var q = (s / (_elm_lang$core$Random$magicNum6 - 1)) | 0;
	var s2 = A2(_elm_lang$core$Basics_ops['%'], q, _elm_lang$core$Random$magicNum7 - 1);
	var s1 = A2(_elm_lang$core$Basics_ops['%'], s, _elm_lang$core$Random$magicNum6 - 1);
	return A2(_elm_lang$core$Random$State, s1 + 1, s2 + 1);
};
var _elm_lang$core$Random$next = function (_p60) {
	var _p61 = _p60;
	var _p63 = _p61._1;
	var _p62 = _p61._0;
	var k2 = (_p63 / _elm_lang$core$Random$magicNum3) | 0;
	var rawState2 = (_elm_lang$core$Random$magicNum4 * (_p63 - (k2 * _elm_lang$core$Random$magicNum3))) - (k2 * _elm_lang$core$Random$magicNum5);
	var newState2 = (_elm_lang$core$Native_Utils.cmp(rawState2, 0) < 0) ? (rawState2 + _elm_lang$core$Random$magicNum7) : rawState2;
	var k1 = (_p62 / _elm_lang$core$Random$magicNum1) | 0;
	var rawState1 = (_elm_lang$core$Random$magicNum0 * (_p62 - (k1 * _elm_lang$core$Random$magicNum1))) - (k1 * _elm_lang$core$Random$magicNum2);
	var newState1 = (_elm_lang$core$Native_Utils.cmp(rawState1, 0) < 0) ? (rawState1 + _elm_lang$core$Random$magicNum6) : rawState1;
	var z = newState1 - newState2;
	var newZ = (_elm_lang$core$Native_Utils.cmp(z, 1) < 0) ? (z + _elm_lang$core$Random$magicNum8) : z;
	return {
		ctor: '_Tuple2',
		_0: newZ,
		_1: A2(_elm_lang$core$Random$State, newState1, newState2)
	};
};
var _elm_lang$core$Random$split = function (_p64) {
	var _p65 = _p64;
	var _p68 = _p65._1;
	var _p67 = _p65._0;
	var _p66 = _elm_lang$core$Tuple$second(
		_elm_lang$core$Random$next(_p65));
	var t1 = _p66._0;
	var t2 = _p66._1;
	var new_s2 = _elm_lang$core$Native_Utils.eq(_p68, 1) ? (_elm_lang$core$Random$magicNum7 - 1) : (_p68 - 1);
	var new_s1 = _elm_lang$core$Native_Utils.eq(_p67, _elm_lang$core$Random$magicNum6 - 1) ? 1 : (_p67 + 1);
	return {
		ctor: '_Tuple2',
		_0: A2(_elm_lang$core$Random$State, new_s1, t2),
		_1: A2(_elm_lang$core$Random$State, t1, new_s2)
	};
};
var _elm_lang$core$Random$Seed = function (a) {
	return {ctor: 'Seed', _0: a};
};
var _elm_lang$core$Random$int = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (_p69) {
				var _p70 = _p69;
				var _p75 = _p70._0;
				var base = 2147483561;
				var f = F3(
					function (n, acc, state) {
						f:
						while (true) {
							var _p71 = n;
							if (_p71 === 0) {
								return {ctor: '_Tuple2', _0: acc, _1: state};
							} else {
								var _p72 = _p75.next(state);
								var x = _p72._0;
								var nextState = _p72._1;
								var _v27 = n - 1,
									_v28 = x + (acc * base),
									_v29 = nextState;
								n = _v27;
								acc = _v28;
								state = _v29;
								continue f;
							}
						}
					});
				var _p73 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p73._0;
				var hi = _p73._1;
				var k = (hi - lo) + 1;
				var n = A2(_elm_lang$core$Random$iLogBase, base, k);
				var _p74 = A3(f, n, 1, _p75.state);
				var v = _p74._0;
				var nextState = _p74._1;
				return {
					ctor: '_Tuple2',
					_0: lo + A2(_elm_lang$core$Basics_ops['%'], v, k),
					_1: _elm_lang$core$Random$Seed(
						_elm_lang$core$Native_Utils.update(
							_p75,
							{state: nextState}))
				};
			});
	});
var _elm_lang$core$Random$bool = A2(
	_elm_lang$core$Random$map,
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		})(1),
	A2(_elm_lang$core$Random$int, 0, 1));
var _elm_lang$core$Random$float = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p76 = A2(
					_elm_lang$core$Random$step,
					A2(_elm_lang$core$Random$int, _elm_lang$core$Random$minInt, _elm_lang$core$Random$maxInt),
					seed);
				var number = _p76._0;
				var newSeed = _p76._1;
				var negativeOneToOne = _elm_lang$core$Basics$toFloat(number) / _elm_lang$core$Basics$toFloat(_elm_lang$core$Random$maxInt - _elm_lang$core$Random$minInt);
				var _p77 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p77._0;
				var hi = _p77._1;
				var scaled = ((lo + hi) / 2) + ((hi - lo) * negativeOneToOne);
				return {ctor: '_Tuple2', _0: scaled, _1: newSeed};
			});
	});
var _elm_lang$core$Random$initialSeed = function (n) {
	return _elm_lang$core$Random$Seed(
		{
			state: _elm_lang$core$Random$initState(n),
			next: _elm_lang$core$Random$next,
			split: _elm_lang$core$Random$split,
			range: _elm_lang$core$Random$range
		});
};
var _elm_lang$core$Random$init = A2(
	_elm_lang$core$Task$andThen,
	function (t) {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Random$initialSeed(
				_elm_lang$core$Basics$round(t)));
	},
	_elm_lang$core$Time$now);
var _elm_lang$core$Random$Generate = function (a) {
	return {ctor: 'Generate', _0: a};
};
var _elm_lang$core$Random$generate = F2(
	function (tagger, generator) {
		return _elm_lang$core$Random$command(
			_elm_lang$core$Random$Generate(
				A2(_elm_lang$core$Random$map, tagger, generator)));
	});
var _elm_lang$core$Random$cmdMap = F2(
	function (func, _p78) {
		var _p79 = _p78;
		return _elm_lang$core$Random$Generate(
			A2(_elm_lang$core$Random$map, func, _p79._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Random'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Random$init, onEffects: _elm_lang$core$Random$onEffects, onSelfMsg: _elm_lang$core$Random$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Random$cmdMap};

var _elm_lang$http$Native_Http = function() {


// ENCODING AND DECODING

function encodeUri(string)
{
	return encodeURIComponent(string);
}

function decodeUri(string)
{
	try
	{
		return _elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch(e)
	{
		return _elm_lang$core$Maybe$Nothing;
	}
}


// SEND REQUEST

function toTask(request, maybeProgress)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NetworkError' }));
		});
		xhr.addEventListener('timeout', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'Timeout' }));
		});
		xhr.addEventListener('load', function() {
			callback(handleResponse(xhr, request.expect.responseToResult));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'BadUrl', _0: request.url }));
		}

		configureRequest(xhr, request);
		send(xhr, request.body);

		return function() { xhr.abort(); };
	});
}

function configureProgress(xhr, maybeProgress)
{
	if (maybeProgress.ctor === 'Nothing')
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_elm_lang$core$Native_Scheduler.rawSpawn(maybeProgress._0({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function configureRequest(xhr, request)
{
	function setHeader(pair)
	{
		xhr.setRequestHeader(pair._0, pair._1);
	}

	A2(_elm_lang$core$List$map, setHeader, request.headers);
	xhr.responseType = request.expect.responseType;
	xhr.withCredentials = request.withCredentials;

	if (request.timeout.ctor === 'Just')
	{
		xhr.timeout = request.timeout._0;
	}
}

function send(xhr, body)
{
	switch (body.ctor)
	{
		case 'EmptyBody':
			xhr.send();
			return;

		case 'StringBody':
			xhr.setRequestHeader('Content-Type', body._0);
			xhr.send(body._1);
			return;

		case 'FormDataBody':
			xhr.send(body._0);
			return;
	}
}


// RESPONSES

function handleResponse(xhr, responseToResult)
{
	var response = toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadStatus',
			_0: response
		});
	}

	var result = responseToResult(response);

	if (result.ctor === 'Ok')
	{
		return _elm_lang$core$Native_Scheduler.succeed(result._0);
	}
	else
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadPayload',
			_0: result._0,
			_1: response
		});
	}
}

function toResponse(xhr)
{
	return {
		status: { code: xhr.status, message: xhr.statusText },
		headers: parseHeaders(xhr.getAllResponseHeaders()),
		url: xhr.responseURL,
		body: xhr.response
	};
}

function parseHeaders(rawHeaders)
{
	var headers = _elm_lang$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(_elm_lang$core$Dict$update, key, function(oldValue) {
				if (oldValue.ctor === 'Just')
				{
					return _elm_lang$core$Maybe$Just(value + ', ' + oldValue._0);
				}
				return _elm_lang$core$Maybe$Just(value);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function expectStringResponse(responseToResult)
{
	return {
		responseType: 'text',
		responseToResult: responseToResult
	};
}

function mapExpect(func, expect)
{
	return {
		responseType: expect.responseType,
		responseToResult: function(response) {
			var convertedResponse = expect.responseToResult(response);
			return A2(_elm_lang$core$Result$map, func, convertedResponse);
		}
	};
}


// BODY

function multipart(parts)
{
	var formData = new FormData();

	while (parts.ctor !== '[]')
	{
		var part = parts._0;
		formData.append(part._0, part._1);
		parts = parts._1;
	}

	return { ctor: 'FormDataBody', _0: formData };
}

return {
	toTask: F2(toTask),
	expectStringResponse: expectStringResponse,
	mapExpect: F2(mapExpect),
	multipart: multipart,
	encodeUri: encodeUri,
	decodeUri: decodeUri
};

}();

var _elm_lang$http$Http_Internal$map = F2(
	function (func, request) {
		return _elm_lang$core$Native_Utils.update(
			request,
			{
				expect: A2(_elm_lang$http$Native_Http.mapExpect, func, request.expect)
			});
	});
var _elm_lang$http$Http_Internal$RawRequest = F7(
	function (a, b, c, d, e, f, g) {
		return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g};
	});
var _elm_lang$http$Http_Internal$Request = function (a) {
	return {ctor: 'Request', _0: a};
};
var _elm_lang$http$Http_Internal$Expect = {ctor: 'Expect'};
var _elm_lang$http$Http_Internal$FormDataBody = {ctor: 'FormDataBody'};
var _elm_lang$http$Http_Internal$StringBody = F2(
	function (a, b) {
		return {ctor: 'StringBody', _0: a, _1: b};
	});
var _elm_lang$http$Http_Internal$EmptyBody = {ctor: 'EmptyBody'};
var _elm_lang$http$Http_Internal$Header = F2(
	function (a, b) {
		return {ctor: 'Header', _0: a, _1: b};
	});

var _elm_lang$http$Http$decodeUri = _elm_lang$http$Native_Http.decodeUri;
var _elm_lang$http$Http$encodeUri = _elm_lang$http$Native_Http.encodeUri;
var _elm_lang$http$Http$expectStringResponse = _elm_lang$http$Native_Http.expectStringResponse;
var _elm_lang$http$Http$expectJson = function (decoder) {
	return _elm_lang$http$Http$expectStringResponse(
		function (response) {
			return A2(_elm_lang$core$Json_Decode$decodeString, decoder, response.body);
		});
};
var _elm_lang$http$Http$expectString = _elm_lang$http$Http$expectStringResponse(
	function (response) {
		return _elm_lang$core$Result$Ok(response.body);
	});
var _elm_lang$http$Http$multipartBody = _elm_lang$http$Native_Http.multipart;
var _elm_lang$http$Http$stringBody = _elm_lang$http$Http_Internal$StringBody;
var _elm_lang$http$Http$jsonBody = function (value) {
	return A2(
		_elm_lang$http$Http_Internal$StringBody,
		'application/json',
		A2(_elm_lang$core$Json_Encode$encode, 0, value));
};
var _elm_lang$http$Http$emptyBody = _elm_lang$http$Http_Internal$EmptyBody;
var _elm_lang$http$Http$header = _elm_lang$http$Http_Internal$Header;
var _elm_lang$http$Http$request = _elm_lang$http$Http_Internal$Request;
var _elm_lang$http$Http$post = F3(
	function (url, body, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'POST',
				headers: {ctor: '[]'},
				url: url,
				body: body,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$get = F2(
	function (url, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'GET',
				headers: {ctor: '[]'},
				url: url,
				body: _elm_lang$http$Http$emptyBody,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$getString = function (url) {
	return _elm_lang$http$Http$request(
		{
			method: 'GET',
			headers: {ctor: '[]'},
			url: url,
			body: _elm_lang$http$Http$emptyBody,
			expect: _elm_lang$http$Http$expectString,
			timeout: _elm_lang$core$Maybe$Nothing,
			withCredentials: false
		});
};
var _elm_lang$http$Http$toTask = function (_p0) {
	var _p1 = _p0;
	return A2(_elm_lang$http$Native_Http.toTask, _p1._0, _elm_lang$core$Maybe$Nothing);
};
var _elm_lang$http$Http$send = F2(
	function (resultToMessage, request) {
		return A2(
			_elm_lang$core$Task$attempt,
			resultToMessage,
			_elm_lang$http$Http$toTask(request));
	});
var _elm_lang$http$Http$Response = F4(
	function (a, b, c, d) {
		return {url: a, status: b, headers: c, body: d};
	});
var _elm_lang$http$Http$BadPayload = F2(
	function (a, b) {
		return {ctor: 'BadPayload', _0: a, _1: b};
	});
var _elm_lang$http$Http$BadStatus = function (a) {
	return {ctor: 'BadStatus', _0: a};
};
var _elm_lang$http$Http$NetworkError = {ctor: 'NetworkError'};
var _elm_lang$http$Http$Timeout = {ctor: 'Timeout'};
var _elm_lang$http$Http$BadUrl = function (a) {
	return {ctor: 'BadUrl', _0: a};
};
var _elm_lang$http$Http$StringPart = F2(
	function (a, b) {
		return {ctor: 'StringPart', _0: a, _1: b};
	});
var _elm_lang$http$Http$stringPart = _elm_lang$http$Http$StringPart;

var _elm_lang$keyboard$Keyboard$onSelfMsg = F3(
	function (router, _p0, state) {
		var _p1 = _p0;
		var _p2 = A2(_elm_lang$core$Dict$get, _p1.category, state);
		if (_p2.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (tagger) {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					tagger(_p1.keyCode));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p3) {
					return _elm_lang$core$Task$succeed(state);
				},
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p2._0.taggers)));
		}
	});
var _elm_lang$keyboard$Keyboard_ops = _elm_lang$keyboard$Keyboard_ops || {};
_elm_lang$keyboard$Keyboard_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p4) {
				return task2;
			},
			task1);
	});
var _elm_lang$keyboard$Keyboard$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$keyboard$Keyboard$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p5 = maybeValues;
		if (_p5.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: value,
					_1: {ctor: '[]'}
				});
		} else {
			return _elm_lang$core$Maybe$Just(
				{ctor: '::', _0: value, _1: _p5._0});
		}
	});
var _elm_lang$keyboard$Keyboard$categorizeHelp = F2(
	function (subs, subDict) {
		categorizeHelp:
		while (true) {
			var _p6 = subs;
			if (_p6.ctor === '[]') {
				return subDict;
			} else {
				var _v4 = _p6._1,
					_v5 = A3(
					_elm_lang$core$Dict$update,
					_p6._0._0,
					_elm_lang$keyboard$Keyboard$categorizeHelpHelp(_p6._0._1),
					subDict);
				subs = _v4;
				subDict = _v5;
				continue categorizeHelp;
			}
		}
	});
var _elm_lang$keyboard$Keyboard$categorize = function (subs) {
	return A2(_elm_lang$keyboard$Keyboard$categorizeHelp, subs, _elm_lang$core$Dict$empty);
};
var _elm_lang$keyboard$Keyboard$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$keyboard$Keyboard$subscription = _elm_lang$core$Native_Platform.leaf('Keyboard');
var _elm_lang$keyboard$Keyboard$Watcher = F2(
	function (a, b) {
		return {taggers: a, pid: b};
	});
var _elm_lang$keyboard$Keyboard$Msg = F2(
	function (a, b) {
		return {category: a, keyCode: b};
	});
var _elm_lang$keyboard$Keyboard$onEffects = F3(
	function (router, newSubs, oldState) {
		var rightStep = F3(
			function (category, taggers, task) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$keyboard$Keyboard$Watcher, taggers, pid),
										state));
							},
							_elm_lang$core$Process$spawn(
								A3(
									_elm_lang$dom$Dom_LowLevel$onDocument,
									category,
									_elm_lang$keyboard$Keyboard$keyCode,
									function (_p7) {
										return A2(
											_elm_lang$core$Platform$sendToSelf,
											router,
											A2(_elm_lang$keyboard$Keyboard$Msg, category, _p7));
									})));
					},
					task);
			});
		var bothStep = F4(
			function (category, _p8, taggers, task) {
				var _p9 = _p8;
				return A2(
					_elm_lang$core$Task$map,
					A2(
						_elm_lang$core$Dict$insert,
						category,
						A2(_elm_lang$keyboard$Keyboard$Watcher, taggers, _p9.pid)),
					task);
			});
		var leftStep = F3(
			function (category, _p10, task) {
				var _p11 = _p10;
				return A2(
					_elm_lang$keyboard$Keyboard_ops['&>'],
					_elm_lang$core$Process$kill(_p11.pid),
					task);
			});
		return A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			oldState,
			_elm_lang$keyboard$Keyboard$categorize(newSubs),
			_elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty));
	});
var _elm_lang$keyboard$Keyboard$MySub = F2(
	function (a, b) {
		return {ctor: 'MySub', _0: a, _1: b};
	});
var _elm_lang$keyboard$Keyboard$presses = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keypress', tagger));
};
var _elm_lang$keyboard$Keyboard$downs = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keydown', tagger));
};
var _elm_lang$keyboard$Keyboard$ups = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keyup', tagger));
};
var _elm_lang$keyboard$Keyboard$subMap = F2(
	function (func, _p12) {
		var _p13 = _p12;
		return A2(
			_elm_lang$keyboard$Keyboard$MySub,
			_p13._0,
			function (_p14) {
				return func(
					_p13._1(_p14));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Keyboard'] = {pkg: 'elm-lang/keyboard', init: _elm_lang$keyboard$Keyboard$init, onEffects: _elm_lang$keyboard$Keyboard$onEffects, onSelfMsg: _elm_lang$keyboard$Keyboard$onSelfMsg, tag: 'sub', subMap: _elm_lang$keyboard$Keyboard$subMap};

var _elm_lang$navigation$Native_Navigation = function() {


// FAKE NAVIGATION

function go(n)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function pushState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}

function replaceState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}


// REAL NAVIGATION

function reloadPage(skipCache)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		document.location.reload(skipCache);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function setLocation(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		try
		{
			window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			document.location.reload(false);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


// GET LOCATION

function getLocation()
{
	var location = document.location;

	return {
		href: location.href,
		host: location.host,
		hostname: location.hostname,
		protocol: location.protocol,
		origin: location.origin,
		port_: location.port,
		pathname: location.pathname,
		search: location.search,
		hash: location.hash,
		username: location.username,
		password: location.password
	};
}


// DETECT IE11 PROBLEMS

function isInternetExplorer11()
{
	return window.navigator.userAgent.indexOf('Trident') !== -1;
}


return {
	go: go,
	setLocation: setLocation,
	reloadPage: reloadPage,
	pushState: pushState,
	replaceState: replaceState,
	getLocation: getLocation,
	isInternetExplorer11: isInternetExplorer11
};

}();

var _elm_lang$navigation$Navigation$replaceState = _elm_lang$navigation$Native_Navigation.replaceState;
var _elm_lang$navigation$Navigation$pushState = _elm_lang$navigation$Native_Navigation.pushState;
var _elm_lang$navigation$Navigation$go = _elm_lang$navigation$Native_Navigation.go;
var _elm_lang$navigation$Navigation$reloadPage = _elm_lang$navigation$Native_Navigation.reloadPage;
var _elm_lang$navigation$Navigation$setLocation = _elm_lang$navigation$Native_Navigation.setLocation;
var _elm_lang$navigation$Navigation_ops = _elm_lang$navigation$Navigation_ops || {};
_elm_lang$navigation$Navigation_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return task2;
			},
			task1);
	});
var _elm_lang$navigation$Navigation$notify = F3(
	function (router, subs, location) {
		var send = function (_p1) {
			var _p2 = _p1;
			return A2(
				_elm_lang$core$Platform$sendToApp,
				router,
				_p2._0(location));
		};
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(_elm_lang$core$List$map, send, subs)),
			_elm_lang$core$Task$succeed(
				{ctor: '_Tuple0'}));
	});
var _elm_lang$navigation$Navigation$cmdHelp = F3(
	function (router, subs, cmd) {
		var _p3 = cmd;
		switch (_p3.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$go(_p3._0);
			case 'New':
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$pushState(_p3._0));
			case 'Modify':
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$replaceState(_p3._0));
			case 'Visit':
				return _elm_lang$navigation$Navigation$setLocation(_p3._0);
			default:
				return _elm_lang$navigation$Navigation$reloadPage(_p3._0);
		}
	});
var _elm_lang$navigation$Navigation$killPopWatcher = function (popWatcher) {
	var _p4 = popWatcher;
	if (_p4.ctor === 'Normal') {
		return _elm_lang$core$Process$kill(_p4._0);
	} else {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Process$kill(_p4._0),
			_elm_lang$core$Process$kill(_p4._1));
	}
};
var _elm_lang$navigation$Navigation$onSelfMsg = F3(
	function (router, location, state) {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			A3(_elm_lang$navigation$Navigation$notify, router, state.subs, location),
			_elm_lang$core$Task$succeed(state));
	});
var _elm_lang$navigation$Navigation$subscription = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$command = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$Location = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {href: a, host: b, hostname: c, protocol: d, origin: e, port_: f, pathname: g, search: h, hash: i, username: j, password: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$navigation$Navigation$State = F2(
	function (a, b) {
		return {subs: a, popWatcher: b};
	});
var _elm_lang$navigation$Navigation$init = _elm_lang$core$Task$succeed(
	A2(
		_elm_lang$navigation$Navigation$State,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing));
var _elm_lang$navigation$Navigation$Reload = function (a) {
	return {ctor: 'Reload', _0: a};
};
var _elm_lang$navigation$Navigation$reload = _elm_lang$navigation$Navigation$command(
	_elm_lang$navigation$Navigation$Reload(false));
var _elm_lang$navigation$Navigation$reloadAndSkipCache = _elm_lang$navigation$Navigation$command(
	_elm_lang$navigation$Navigation$Reload(true));
var _elm_lang$navigation$Navigation$Visit = function (a) {
	return {ctor: 'Visit', _0: a};
};
var _elm_lang$navigation$Navigation$load = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Visit(url));
};
var _elm_lang$navigation$Navigation$Modify = function (a) {
	return {ctor: 'Modify', _0: a};
};
var _elm_lang$navigation$Navigation$modifyUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Modify(url));
};
var _elm_lang$navigation$Navigation$New = function (a) {
	return {ctor: 'New', _0: a};
};
var _elm_lang$navigation$Navigation$newUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$New(url));
};
var _elm_lang$navigation$Navigation$Jump = function (a) {
	return {ctor: 'Jump', _0: a};
};
var _elm_lang$navigation$Navigation$back = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(0 - n));
};
var _elm_lang$navigation$Navigation$forward = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(n));
};
var _elm_lang$navigation$Navigation$cmdMap = F2(
	function (_p5, myCmd) {
		var _p6 = myCmd;
		switch (_p6.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$Jump(_p6._0);
			case 'New':
				return _elm_lang$navigation$Navigation$New(_p6._0);
			case 'Modify':
				return _elm_lang$navigation$Navigation$Modify(_p6._0);
			case 'Visit':
				return _elm_lang$navigation$Navigation$Visit(_p6._0);
			default:
				return _elm_lang$navigation$Navigation$Reload(_p6._0);
		}
	});
var _elm_lang$navigation$Navigation$Monitor = function (a) {
	return {ctor: 'Monitor', _0: a};
};
var _elm_lang$navigation$Navigation$program = F2(
	function (locationToMessage, stuff) {
		var init = stuff.init(
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$program(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$programWithFlags = F2(
	function (locationToMessage, stuff) {
		var init = function (flags) {
			return A2(
				stuff.init,
				flags,
				_elm_lang$navigation$Native_Navigation.getLocation(
					{ctor: '_Tuple0'}));
		};
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$programWithFlags(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$subMap = F2(
	function (func, _p7) {
		var _p8 = _p7;
		return _elm_lang$navigation$Navigation$Monitor(
			function (_p9) {
				return func(
					_p8._0(_p9));
			});
	});
var _elm_lang$navigation$Navigation$InternetExplorer = F2(
	function (a, b) {
		return {ctor: 'InternetExplorer', _0: a, _1: b};
	});
var _elm_lang$navigation$Navigation$Normal = function (a) {
	return {ctor: 'Normal', _0: a};
};
var _elm_lang$navigation$Navigation$spawnPopWatcher = function (router) {
	var reportLocation = function (_p10) {
		return A2(
			_elm_lang$core$Platform$sendToSelf,
			router,
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
	};
	return _elm_lang$navigation$Native_Navigation.isInternetExplorer11(
		{ctor: '_Tuple0'}) ? A3(
		_elm_lang$core$Task$map2,
		_elm_lang$navigation$Navigation$InternetExplorer,
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'popstate', _elm_lang$core$Json_Decode$value, reportLocation)),
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'hashchange', _elm_lang$core$Json_Decode$value, reportLocation))) : A2(
		_elm_lang$core$Task$map,
		_elm_lang$navigation$Navigation$Normal,
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'popstate', _elm_lang$core$Json_Decode$value, reportLocation)));
};
var _elm_lang$navigation$Navigation$onEffects = F4(
	function (router, cmds, subs, _p11) {
		var _p12 = _p11;
		var _p15 = _p12.popWatcher;
		var stepState = function () {
			var _p13 = {ctor: '_Tuple2', _0: subs, _1: _p15};
			_v6_2:
			do {
				if (_p13._0.ctor === '[]') {
					if (_p13._1.ctor === 'Just') {
						return A2(
							_elm_lang$navigation$Navigation_ops['&>'],
							_elm_lang$navigation$Navigation$killPopWatcher(_p13._1._0),
							_elm_lang$core$Task$succeed(
								A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
					} else {
						break _v6_2;
					}
				} else {
					if (_p13._1.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Task$map,
							function (_p14) {
								return A2(
									_elm_lang$navigation$Navigation$State,
									subs,
									_elm_lang$core$Maybe$Just(_p14));
							},
							_elm_lang$navigation$Navigation$spawnPopWatcher(router));
					} else {
						break _v6_2;
					}
				}
			} while(false);
			return _elm_lang$core$Task$succeed(
				A2(_elm_lang$navigation$Navigation$State, subs, _p15));
		}();
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					A2(_elm_lang$navigation$Navigation$cmdHelp, router, subs),
					cmds)),
			stepState);
	});
_elm_lang$core$Native_Platform.effectManagers['Navigation'] = {pkg: 'elm-lang/navigation', init: _elm_lang$navigation$Navigation$init, onEffects: _elm_lang$navigation$Navigation$onEffects, onSelfMsg: _elm_lang$navigation$Navigation$onSelfMsg, tag: 'fx', cmdMap: _elm_lang$navigation$Navigation$cmdMap, subMap: _elm_lang$navigation$Navigation$subMap};

var _evancz$url_parser$UrlParser$toKeyValuePair = function (segment) {
	var _p0 = A2(_elm_lang$core$String$split, '=', segment);
	if (((_p0.ctor === '::') && (_p0._1.ctor === '::')) && (_p0._1._1.ctor === '[]')) {
		return A3(
			_elm_lang$core$Maybe$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_elm_lang$http$Http$decodeUri(_p0._0),
			_elm_lang$http$Http$decodeUri(_p0._1._0));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _evancz$url_parser$UrlParser$parseParams = function (queryString) {
	return _elm_lang$core$Dict$fromList(
		A2(
			_elm_lang$core$List$filterMap,
			_evancz$url_parser$UrlParser$toKeyValuePair,
			A2(
				_elm_lang$core$String$split,
				'&',
				A2(_elm_lang$core$String$dropLeft, 1, queryString))));
};
var _evancz$url_parser$UrlParser$splitUrl = function (url) {
	var _p1 = A2(_elm_lang$core$String$split, '/', url);
	if ((_p1.ctor === '::') && (_p1._0 === '')) {
		return _p1._1;
	} else {
		return _p1;
	}
};
var _evancz$url_parser$UrlParser$parseHelp = function (states) {
	parseHelp:
	while (true) {
		var _p2 = states;
		if (_p2.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var _p4 = _p2._0;
			var _p3 = _p4.unvisited;
			if (_p3.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p4.value);
			} else {
				if ((_p3._0 === '') && (_p3._1.ctor === '[]')) {
					return _elm_lang$core$Maybe$Just(_p4.value);
				} else {
					var _v4 = _p2._1;
					states = _v4;
					continue parseHelp;
				}
			}
		}
	}
};
var _evancz$url_parser$UrlParser$parse = F3(
	function (_p5, url, params) {
		var _p6 = _p5;
		return _evancz$url_parser$UrlParser$parseHelp(
			_p6._0(
				{
					visited: {ctor: '[]'},
					unvisited: _evancz$url_parser$UrlParser$splitUrl(url),
					params: params,
					value: _elm_lang$core$Basics$identity
				}));
	});
var _evancz$url_parser$UrlParser$parseHash = F2(
	function (parser, location) {
		return A3(
			_evancz$url_parser$UrlParser$parse,
			parser,
			A2(_elm_lang$core$String$dropLeft, 1, location.hash),
			_evancz$url_parser$UrlParser$parseParams(location.search));
	});
var _evancz$url_parser$UrlParser$parsePath = F2(
	function (parser, location) {
		return A3(
			_evancz$url_parser$UrlParser$parse,
			parser,
			location.pathname,
			_evancz$url_parser$UrlParser$parseParams(location.search));
	});
var _evancz$url_parser$UrlParser$intParamHelp = function (maybeValue) {
	var _p7 = maybeValue;
	if (_p7.ctor === 'Nothing') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Result$toMaybe(
			_elm_lang$core$String$toInt(_p7._0));
	}
};
var _evancz$url_parser$UrlParser$mapHelp = F2(
	function (func, _p8) {
		var _p9 = _p8;
		return {
			visited: _p9.visited,
			unvisited: _p9.unvisited,
			params: _p9.params,
			value: func(_p9.value)
		};
	});
var _evancz$url_parser$UrlParser$State = F4(
	function (a, b, c, d) {
		return {visited: a, unvisited: b, params: c, value: d};
	});
var _evancz$url_parser$UrlParser$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _evancz$url_parser$UrlParser$s = function (str) {
	return _evancz$url_parser$UrlParser$Parser(
		function (_p10) {
			var _p11 = _p10;
			var _p12 = _p11.unvisited;
			if (_p12.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p13 = _p12._0;
				return _elm_lang$core$Native_Utils.eq(_p13, str) ? {
					ctor: '::',
					_0: A4(
						_evancz$url_parser$UrlParser$State,
						{ctor: '::', _0: _p13, _1: _p11.visited},
						_p12._1,
						_p11.params,
						_p11.value),
					_1: {ctor: '[]'}
				} : {ctor: '[]'};
			}
		});
};
var _evancz$url_parser$UrlParser$custom = F2(
	function (tipe, stringToSomething) {
		return _evancz$url_parser$UrlParser$Parser(
			function (_p14) {
				var _p15 = _p14;
				var _p16 = _p15.unvisited;
				if (_p16.ctor === '[]') {
					return {ctor: '[]'};
				} else {
					var _p18 = _p16._0;
					var _p17 = stringToSomething(_p18);
					if (_p17.ctor === 'Ok') {
						return {
							ctor: '::',
							_0: A4(
								_evancz$url_parser$UrlParser$State,
								{ctor: '::', _0: _p18, _1: _p15.visited},
								_p16._1,
								_p15.params,
								_p15.value(_p17._0)),
							_1: {ctor: '[]'}
						};
					} else {
						return {ctor: '[]'};
					}
				}
			});
	});
var _evancz$url_parser$UrlParser$string = A2(_evancz$url_parser$UrlParser$custom, 'STRING', _elm_lang$core$Result$Ok);
var _evancz$url_parser$UrlParser$int = A2(_evancz$url_parser$UrlParser$custom, 'NUMBER', _elm_lang$core$String$toInt);
var _evancz$url_parser$UrlParser_ops = _evancz$url_parser$UrlParser_ops || {};
_evancz$url_parser$UrlParser_ops['</>'] = F2(
	function (_p20, _p19) {
		var _p21 = _p20;
		var _p22 = _p19;
		return _evancz$url_parser$UrlParser$Parser(
			function (state) {
				return A2(
					_elm_lang$core$List$concatMap,
					_p22._0,
					_p21._0(state));
			});
	});
var _evancz$url_parser$UrlParser$map = F2(
	function (subValue, _p23) {
		var _p24 = _p23;
		return _evancz$url_parser$UrlParser$Parser(
			function (_p25) {
				var _p26 = _p25;
				return A2(
					_elm_lang$core$List$map,
					_evancz$url_parser$UrlParser$mapHelp(_p26.value),
					_p24._0(
						{visited: _p26.visited, unvisited: _p26.unvisited, params: _p26.params, value: subValue}));
			});
	});
var _evancz$url_parser$UrlParser$oneOf = function (parsers) {
	return _evancz$url_parser$UrlParser$Parser(
		function (state) {
			return A2(
				_elm_lang$core$List$concatMap,
				function (_p27) {
					var _p28 = _p27;
					return _p28._0(state);
				},
				parsers);
		});
};
var _evancz$url_parser$UrlParser$top = _evancz$url_parser$UrlParser$Parser(
	function (state) {
		return {
			ctor: '::',
			_0: state,
			_1: {ctor: '[]'}
		};
	});
var _evancz$url_parser$UrlParser_ops = _evancz$url_parser$UrlParser_ops || {};
_evancz$url_parser$UrlParser_ops['<?>'] = F2(
	function (_p30, _p29) {
		var _p31 = _p30;
		var _p32 = _p29;
		return _evancz$url_parser$UrlParser$Parser(
			function (state) {
				return A2(
					_elm_lang$core$List$concatMap,
					_p32._0,
					_p31._0(state));
			});
	});
var _evancz$url_parser$UrlParser$QueryParser = function (a) {
	return {ctor: 'QueryParser', _0: a};
};
var _evancz$url_parser$UrlParser$customParam = F2(
	function (key, func) {
		return _evancz$url_parser$UrlParser$QueryParser(
			function (_p33) {
				var _p34 = _p33;
				var _p35 = _p34.params;
				return {
					ctor: '::',
					_0: A4(
						_evancz$url_parser$UrlParser$State,
						_p34.visited,
						_p34.unvisited,
						_p35,
						_p34.value(
							func(
								A2(_elm_lang$core$Dict$get, key, _p35)))),
					_1: {ctor: '[]'}
				};
			});
	});
var _evancz$url_parser$UrlParser$stringParam = function (name) {
	return A2(_evancz$url_parser$UrlParser$customParam, name, _elm_lang$core$Basics$identity);
};
var _evancz$url_parser$UrlParser$intParam = function (name) {
	return A2(_evancz$url_parser$UrlParser$customParam, name, _evancz$url_parser$UrlParser$intParamHelp);
};

var _fapian$elm_html_aria$Html_Attributes_Aria$role = _elm_lang$html$Html_Attributes$attribute('role');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaSelected = _elm_lang$html$Html_Attributes$attribute('aria-selected');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaLive = _elm_lang$html$Html_Attributes$attribute('aria-live');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaLabelledby = _elm_lang$html$Html_Attributes$attribute('aria-labelledby');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaLabel = _elm_lang$html$Html_Attributes$attribute('aria-label');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaExpanded = _elm_lang$html$Html_Attributes$attribute('aria-expanded');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaDescribedby = _elm_lang$html$Html_Attributes$attribute('aria-describedby');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaChecked = _elm_lang$html$Html_Attributes$attribute('aria-checked');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaActiveDescendant = _elm_lang$html$Html_Attributes$attribute('aria-activedescendant');
var _fapian$elm_html_aria$Html_Attributes_Aria$boolAttribute = F2(
	function (name, val) {
		return A2(
			_elm_lang$html$Html_Attributes$attribute,
			name,
			A2(
				_elm_lang$core$Json_Encode$encode,
				0,
				_elm_lang$core$Json_Encode$bool(val)));
	});
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaDisabled = _fapian$elm_html_aria$Html_Attributes_Aria$boolAttribute('aria-disabled');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaHidden = _fapian$elm_html_aria$Html_Attributes_Aria$boolAttribute('aria-hidden');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaPressed = _fapian$elm_html_aria$Html_Attributes_Aria$boolAttribute('aria-pressed');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaReadonly = _fapian$elm_html_aria$Html_Attributes_Aria$boolAttribute('aria-readonly');
var _fapian$elm_html_aria$Html_Attributes_Aria$ariaRequired = _fapian$elm_html_aria$Html_Attributes_Aria$boolAttribute('aria-required');

var _user$project$Model_ModelProduct$ScheduleDate = F3(
	function (a, b, c) {
		return {day: a, month: b, year: c};
	});
var _user$project$Model_ModelProduct$NewProduct = F3(
	function (a, b, c) {
		return {featured_image: a, price: b, url: c};
	});
var _user$project$Model_ModelProduct$ProductAssoc = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return {id: a, name: b, display_name: c, description: d, blog_description: e, featured_image: f, schedule_date: g, draft: h, cta: i, price: j, product_type: k, url: l, url_text: m, inserted_at: n, category: o, product_tags: p, product_like: q};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelProduct$Product = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return {id: a, name: b, display_name: c, description: d, blog_description: e, featured_image: f, schedule_date: g, draft: h, cta: i, price: j, product_type: k, url: l, url_text: m};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelProduct$ProductForm = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return {display_name: a, description: b, blog_description: c, original_featured_image: d, featured_image: e, draft: f, schedule_date: g, cta: h, price: i, url: j, url_text: k, category: l, category_id: m, tag_id: n, product_like: o, product_type: p};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelProduct$PostAssoc = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {id: a, name: b, display_name: c, author: d, excerpt: e, featured_image: f, post_type: g, tag: h, product_limit: i, product_offset: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelProduct$Post = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {id: a, name: b, display_name: c, author: d, excerpt: e, featured_image: f, post_type: g, product_limit: h, product_offset: i};
	});
var _user$project$Model_ModelProduct$PostForm = F8(
	function (a, b, c, d, e, f, g, h) {
		return {display_name: a, author: b, excerpt: c, featured_image: d, post_type: e, tag: f, product_limit: g, product_offset: h};
	});
var _user$project$Model_ModelProduct$TagAssoc = F6(
	function (a, b, c, d, e, f) {
		return {id: a, name: b, display_name: c, description: d, products: e, posts: f};
	});
var _user$project$Model_ModelProduct$Tag = F4(
	function (a, b, c, d) {
		return {id: a, name: b, display_name: c, description: d};
	});
var _user$project$Model_ModelProduct$TagForm = F2(
	function (a, b) {
		return {display_name: a, description: b};
	});
var _user$project$Model_ModelProduct$Social = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return {id: a, name: b, description: c, display_name: d, url: e, draft: f, schedule_date: g, facebook_code: h, featured_image: i, image_caption: j, image_caption: k, social_media_type: l, tags: m};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelProduct$SocialForm = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {display_name: a, description: b, tags: c, draft: d, schedule_date: e, facebook_code: f, featured_image: g, url: h, image_caption: i, social_media_type: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelProduct$Update = F8(
	function (a, b, c, d, e, f, g, h) {
		return {id: a, name: b, display_name: c, title: d, excerpt: e, author: f, draft: g, schedule_date: h};
	});
var _user$project$Model_ModelProduct$UpdateForm = F6(
	function (a, b, c, d, e, f) {
		return {display_name: a, title: b, excerpt: c, author: d, schedule_date: e, draft: f};
	});
var _user$project$Model_ModelProduct$Category = F5(
	function (a, b, c, d, e) {
		return {id: a, name: b, display_name: c, description: d, icon: e};
	});
var _user$project$Model_ModelProduct$Like = F2(
	function (a, b) {
		return {id: a, total: b};
	});

var _user$project$Model_ModelMisc$WebsitesDropdown = F3(
	function (a, b, c) {
		return {acronym: a, name: b, selection: c};
	});
var _user$project$Model_ModelMisc$ConsoleItem = F4(
	function (a, b, c, d) {
		return {inserted_at: a, command: b, console_type: c, text: d};
	});
var _user$project$Model_ModelMisc$CurrentTask = F2(
	function (a, b) {
		return {name: a, duration: b};
	});
var _user$project$Model_ModelMisc$WebsiteIndividualData = F8(
	function (a, b, c, d, e, f, g, h) {
		return {productsAssoc: a, categories: b, tagsAssoc: c, posts: d, productsDraft: e, social: f, updates: g, message: h};
	});
var _user$project$Model_ModelMisc$SocialMediaPrefil = F4(
	function (a, b, c, d) {
		return {display_name: a, featured_image: b, url: c, description: d};
	});
var _user$project$Model_ModelMisc$AW = {ctor: 'AW'};
var _user$project$Model_ModelMisc$A9 = {ctor: 'A9'};
var _user$project$Model_ModelMisc$AHP = {ctor: 'AHP'};
var _user$project$Model_ModelMisc$APO = {ctor: 'APO'};
var _user$project$Model_ModelMisc$ACH = {ctor: 'ACH'};
var _user$project$Model_ModelMisc$AP = {ctor: 'AP'};
var _user$project$Model_ModelMisc$AF = {ctor: 'AF'};
var _user$project$Model_ModelMisc$AC = {ctor: 'AC'};
var _user$project$Model_ModelMisc$ALL = {ctor: 'ALL'};
var _user$project$Model_ModelMisc$Failure = {ctor: 'Failure'};
var _user$project$Model_ModelMisc$Success = {ctor: 'Success'};
var _user$project$Model_ModelMisc$Load = {ctor: 'Load'};
var _user$project$Model_ModelMisc$NonExistent = {ctor: 'NonExistent'};
var _user$project$Model_ModelMisc$Toggle = {ctor: 'Toggle'};
var _user$project$Model_ModelMisc$Begin = {ctor: 'Begin'};
var _user$project$Model_ModelMisc$NewSession = {ctor: 'NewSession'};
var _user$project$Model_ModelMisc$StopServer = {ctor: 'StopServer'};
var _user$project$Model_ModelMisc$RestartServer = {ctor: 'RestartServer'};
var _user$project$Model_ModelMisc$StartServer = {ctor: 'StartServer'};

var _user$project$Model_ModelConfig$CommonEnvData = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {mailgun_key: a, amazon_associate_tag: b, aws_access_key_id: c, aws_secret_access_key: d, marketplace_host: e, amazon_s3_access_key: f, amazon_s3_secret_access_key: g, etsy_api_key: h, etsy_secret_key: i, tumblr_access_token: j, tumblr_access_token_secret: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelConfig$IndividualEnvData = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return {mailgun_domain: a, amazon_s3_bucket_name: b, recaptcha_public_key: c, recaptcha_private_key: d, twitter_api_key: e, twitter_secret_key: f, twitter_access_token: g, twitter_access_token_secret: h, facebook_api_key: i, facebook_secret_key: j, facebook_page_id: k, facebook_redirect_url: l, tumblr_api_key: m, tumblr_secret_key: n, tumblr_blog_identifier: o, pintrest_api_key: p, pintrest_secret_key: q};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelConfig$ConfigEnvData = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return function (s) {
																			return function (t) {
																				return function (u) {
																					return function (v) {
																						return function (w) {
																							return function (x) {
																								return function (y) {
																									return function (z) {
																										return function (_1) {
																											return function (_2) {
																												return {website_acronym: a, website_name: b, website_name_lower: c, website_domain: d, website_logo_png: e, website_logo_svg: f, website_favicon: g, website_title: h, website_description: i, website_keywords: j, website_twitter: k, website_alt_image: l, blog_meta_description: m, categories_meta_description: n, updates_meta_description: o, about_meta_description: p, contact_meta_description: q, submit_meta_description: r, login_meta_description: s, register_meta_description: t, search_meta_description: u, about_copy: v, submit_copy: w, letter_copy: x, google_analytics_tracking_id: y, google_site_verification: z, primary_email: _1, password: _2};
																											};
																										};
																									};
																								};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelConfig$ConfigEnvDataFormType = function (a) {
	return {ctor: 'ConfigEnvDataFormType', _0: a};
};
var _user$project$Model_ModelConfig$IndividualEnvDataFormType = function (a) {
	return {ctor: 'IndividualEnvDataFormType', _0: a};
};
var _user$project$Model_ModelConfig$CommonEnvDataFormType = function (a) {
	return {ctor: 'CommonEnvDataFormType', _0: a};
};

var _user$project$Model_ModelBuild$BuildForm = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return function (s) {
																			return function (t) {
																				return function (u) {
																					return function (v) {
																						return function (w) {
																							return function (x) {
																								return function (y) {
																									return function (z) {
																										return function (_1) {
																											return function (_2) {
																												return function (_3) {
																													return function (_4) {
																														return function (_5) {
																															return function (_6) {
																																return {website_acronym: a, website_lower: b, website_capital: c, num_of_categories: d, c1_name: e, c1_display_name: f, c1_model: g, c1_icon: h, c2_name: i, c2_display_name: j, c2_model: k, c2_icon: l, c3_name: m, c3_display_name: n, c3_model: o, c3_icon: p, c4_name: q, c4_display_name: r, c4_model: s, c4_icon: t, c5_name: u, c5_display_name: v, c5_model: w, c5_icon: x, c6_name: y, c6_display_name: z, c6_model: _1, c6_icon: _2, c7_name: _3, c7_display_name: _4, c7_model: _5, c7_icon: _6};
																															};
																														};
																													};
																												};
																											};
																										};
																									};
																								};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};

var _user$project$Model_ModelEncode$scheduleDateEncoder = function (scheduleDate) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'day',
				_1: _elm_lang$core$Json_Encode$int(scheduleDate.day)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'month',
					_1: _elm_lang$core$Json_Encode$int(scheduleDate.month)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'year',
						_1: _elm_lang$core$Json_Encode$int(scheduleDate.year)
					},
					_1: {ctor: '[]'}
				}
			}
		});
};
var _user$project$Model_ModelEncode$updateFormEncoder = function (formItem) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'display_name',
				_1: _elm_lang$core$Json_Encode$string(formItem.display_name)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'title',
					_1: _elm_lang$core$Json_Encode$string(formItem.title)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'excerpt',
						_1: _elm_lang$core$Json_Encode$string(formItem.excerpt)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'author',
							_1: _elm_lang$core$Json_Encode$string(formItem.author)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'schedule_date',
								_1: _user$project$Model_ModelEncode$scheduleDateEncoder(formItem.schedule_date)
							},
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$updateFormDataEncoder = function (data) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _user$project$Model_ModelEncode$updateFormEncoder(data)
			},
			_1: {ctor: '[]'}
		});
};
var _user$project$Model_ModelEncode$tagFormEncoder = function (formItem) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'display_name',
				_1: _elm_lang$core$Json_Encode$string(formItem.display_name)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'description',
					_1: _elm_lang$core$Json_Encode$string(formItem.description)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Model_ModelEncode$tagFormDataEncoder = function (data) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _user$project$Model_ModelEncode$tagFormEncoder(data)
			},
			_1: {ctor: '[]'}
		});
};
var _user$project$Model_ModelEncode$socialFormEncoder = function (formItem) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'display_name',
				_1: _elm_lang$core$Json_Encode$string(formItem.display_name)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'description',
					_1: _elm_lang$core$Json_Encode$string(formItem.description)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'tags',
						_1: _elm_lang$core$Json_Encode$string(formItem.tags)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'draft',
							_1: _elm_lang$core$Json_Encode$bool(formItem.draft)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'schedule_date',
								_1: _user$project$Model_ModelEncode$scheduleDateEncoder(formItem.schedule_date)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'facebook_code',
									_1: _elm_lang$core$Json_Encode$string(formItem.facebook_code)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'featured_image',
										_1: _elm_lang$core$Json_Encode$string(formItem.featured_image)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'url',
											_1: _elm_lang$core$Json_Encode$string(formItem.url)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'image_caption',
												_1: _elm_lang$core$Json_Encode$string(formItem.image_caption)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'social_media_type',
													_1: _elm_lang$core$Json_Encode$string(formItem.social_media_type)
												},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$socialFormDataEncoder = function (data) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _user$project$Model_ModelEncode$socialFormEncoder(data)
			},
			_1: {ctor: '[]'}
		});
};
var _user$project$Model_ModelEncode$productFormEncoder = function (formItem) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'display_name',
				_1: _elm_lang$core$Json_Encode$string(formItem.display_name)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'description',
					_1: _elm_lang$core$Json_Encode$string(formItem.description)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'blog_description',
						_1: _elm_lang$core$Json_Encode$string(formItem.blog_description)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'original_featured_image',
							_1: _elm_lang$core$Json_Encode$string(formItem.original_featured_image)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'featured_image',
								_1: _elm_lang$core$Json_Encode$string(formItem.featured_image)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'draft',
									_1: _elm_lang$core$Json_Encode$bool(formItem.draft)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'schedule_date',
										_1: _user$project$Model_ModelEncode$scheduleDateEncoder(formItem.schedule_date)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'cta',
											_1: _elm_lang$core$Json_Encode$string(formItem.cta)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'price',
												_1: _elm_lang$core$Json_Encode$float(formItem.price)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'product_type',
													_1: _elm_lang$core$Json_Encode$string(formItem.product_type)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'url',
														_1: _elm_lang$core$Json_Encode$string(formItem.url)
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'url_text',
															_1: _elm_lang$core$Json_Encode$string(formItem.url_text)
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'category_id',
																_1: _elm_lang$core$Json_Encode$string(formItem.category_id)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'tag_id',
																	_1: _elm_lang$core$Json_Encode$list(
																		A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, formItem.tag_id))
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'product_like',
																		_1: _elm_lang$core$Json_Encode$int(formItem.product_like)
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 'product_type',
																			_1: _elm_lang$core$Json_Encode$string(formItem.product_type)
																		},
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$productFormDataEncoder = function (data) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _user$project$Model_ModelEncode$productFormEncoder(data)
			},
			_1: {ctor: '[]'}
		});
};
var _user$project$Model_ModelEncode$tagMaybeEncoder = function (productTag) {
	var _p0 = productTag;
	if (_p0.ctor === 'Just') {
		var _p1 = _p0._0;
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'id',
					_1: _elm_lang$core$Json_Encode$string(_p1.id)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _elm_lang$core$Json_Encode$string(_p1.name)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'display_name',
							_1: _elm_lang$core$Json_Encode$string(_p1.display_name)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'description',
								_1: _elm_lang$core$Json_Encode$string(_p1.description)
							},
							_1: {ctor: '[]'}
						}
					}
				}
			});
	} else {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'id',
					_1: _elm_lang$core$Json_Encode$string('yolo')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _elm_lang$core$Json_Encode$string('yolo')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'display_name',
							_1: _elm_lang$core$Json_Encode$string('yolo')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'description',
								_1: _elm_lang$core$Json_Encode$string('yolo')
							},
							_1: {ctor: '[]'}
						}
					}
				}
			});
	}
};
var _user$project$Model_ModelEncode$postFormEncoder = function (formItem) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'display_name',
				_1: _elm_lang$core$Json_Encode$string(formItem.display_name)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'author',
					_1: _elm_lang$core$Json_Encode$string(formItem.author)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'excerpt',
						_1: _elm_lang$core$Json_Encode$string(formItem.excerpt)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'featured_image',
							_1: _elm_lang$core$Json_Encode$string(formItem.featured_image)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'post_type',
								_1: _elm_lang$core$Json_Encode$string(formItem.post_type)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'post_type',
									_1: _elm_lang$core$Json_Encode$string(formItem.post_type)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'tag',
										_1: _user$project$Model_ModelEncode$tagMaybeEncoder(formItem.tag)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'product_limit',
											_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _elm_lang$core$Json_Encode$int, formItem.product_limit)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'product_offset',
												_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _elm_lang$core$Json_Encode$int, formItem.product_offset)
											},
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$postFormDataEncoder = function (data) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _user$project$Model_ModelEncode$postFormEncoder(data)
			},
			_1: {ctor: '[]'}
		});
};
var _user$project$Model_ModelEncode$postsEncoder = function (formItem) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(formItem.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(formItem.name)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'display_name',
						_1: _elm_lang$core$Json_Encode$string(formItem.display_name)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'author',
							_1: _elm_lang$core$Json_Encode$string(formItem.author)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'excerpt',
								_1: _elm_lang$core$Json_Encode$string(formItem.excerpt)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'featured_image',
									_1: _elm_lang$core$Json_Encode$string(formItem.featured_image)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'post_type',
										_1: _elm_lang$core$Json_Encode$string(formItem.post_type)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'post_type',
											_1: _elm_lang$core$Json_Encode$string(formItem.post_type)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'tag',
												_1: _user$project$Model_ModelEncode$tagMaybeEncoder(formItem.tag)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'product_limit',
													_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _elm_lang$core$Json_Encode$int, formItem.product_limit)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'product_offset',
														_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _elm_lang$core$Json_Encode$int, formItem.product_offset)
													},
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$likeEncoder = function (productLike) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(productLike.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'total',
					_1: _elm_lang$core$Json_Encode$int(productLike.total)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Model_ModelEncode$tagEncoder = function (productTag) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(productTag.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(productTag.name)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'display_name',
						_1: _elm_lang$core$Json_Encode$string(productTag.display_name)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'description',
							_1: _elm_lang$core$Json_Encode$string(productTag.description)
						},
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$categoryEncoder = function (productCategory) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(productCategory.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(productCategory.name)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'display_name',
						_1: _elm_lang$core$Json_Encode$string(productCategory.display_name)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'description',
							_1: _elm_lang$core$Json_Encode$string(productCategory.description)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'icon',
								_1: _elm_lang$core$Json_Encode$string(productCategory.icon)
							},
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$productAssocEncoder = function (productAssoc) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(productAssoc.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(productAssoc.name)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'display_name',
						_1: _elm_lang$core$Json_Encode$string(productAssoc.display_name)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'description',
							_1: _elm_lang$core$Json_Encode$string(productAssoc.description)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'blog_description',
								_1: _elm_lang$core$Json_Encode$string(productAssoc.blog_description)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'featured_image',
									_1: _elm_lang$core$Json_Encode$string(productAssoc.featured_image)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'draft',
										_1: _elm_lang$core$Json_Encode$bool(productAssoc.draft)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'cta',
											_1: _elm_lang$core$Json_Encode$string(productAssoc.cta)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'price',
												_1: _elm_lang$core$Json_Encode$float(productAssoc.price)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'product_type',
													_1: _elm_lang$core$Json_Encode$string(productAssoc.product_type)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'url',
														_1: _elm_lang$core$Json_Encode$string(productAssoc.url)
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'url_text',
															_1: _elm_lang$core$Json_Encode$string(productAssoc.url_text)
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'category',
																_1: _user$project$Model_ModelEncode$categoryEncoder(productAssoc.category)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'product_tags',
																	_1: _elm_lang$core$Json_Encode$list(
																		A2(_elm_lang$core$List$map, _user$project$Model_ModelEncode$tagEncoder, productAssoc.product_tags))
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'product_like',
																		_1: _user$project$Model_ModelEncode$likeEncoder(productAssoc.product_like)
																	},
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$prefilNewProductEncoder = function (input) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'input',
				_1: _elm_lang$core$Json_Encode$string(input)
			},
			_1: {ctor: '[]'}
		});
};
var _user$project$Model_ModelEncode$configEncoder = function (config) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'website_acronym',
				_1: _elm_lang$core$Json_Encode$string(config.website_acronym)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'website_name',
					_1: _elm_lang$core$Json_Encode$string(config.website_name)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'website_name_lower',
						_1: _elm_lang$core$Json_Encode$string(config.website_name_lower)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'website_domain',
							_1: _elm_lang$core$Json_Encode$string(config.website_domain)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'website_logo_png',
								_1: _elm_lang$core$Json_Encode$string(config.website_logo_png)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'website_logo_svg',
									_1: _elm_lang$core$Json_Encode$string(config.website_logo_svg)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'website_favicon',
										_1: _elm_lang$core$Json_Encode$string(config.website_favicon)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'website_title',
											_1: _elm_lang$core$Json_Encode$string(config.website_title)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'website_description',
												_1: _elm_lang$core$Json_Encode$string(config.website_description)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'website_keywords',
													_1: _elm_lang$core$Json_Encode$string(config.website_keywords)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'website_twitter',
														_1: _elm_lang$core$Json_Encode$string(config.website_twitter)
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'website_alt_image',
															_1: _elm_lang$core$Json_Encode$string(config.website_alt_image)
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'blog_meta_description',
																_1: _elm_lang$core$Json_Encode$string(config.blog_meta_description)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'categories_meta_description',
																	_1: _elm_lang$core$Json_Encode$string(config.categories_meta_description)
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'updates_meta_description',
																		_1: _elm_lang$core$Json_Encode$string(config.updates_meta_description)
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 'about_meta_description',
																			_1: _elm_lang$core$Json_Encode$string(config.about_meta_description)
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: 'contact_meta_description',
																				_1: _elm_lang$core$Json_Encode$string(config.contact_meta_description)
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: 'submit_meta_description',
																					_1: _elm_lang$core$Json_Encode$string(config.submit_meta_description)
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: 'login_meta_description',
																						_1: _elm_lang$core$Json_Encode$string(config.login_meta_description)
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: 'register_meta_description',
																							_1: _elm_lang$core$Json_Encode$string(config.register_meta_description)
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: 'search_meta_description',
																								_1: _elm_lang$core$Json_Encode$string(config.search_meta_description)
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: 'about_copy',
																									_1: _elm_lang$core$Json_Encode$string(config.about_copy)
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: 'submit_copy',
																										_1: _elm_lang$core$Json_Encode$string(config.submit_copy)
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: 'letter_copy',
																											_1: _elm_lang$core$Json_Encode$string(config.letter_copy)
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: 'google_analytics_tracking_id',
																												_1: _elm_lang$core$Json_Encode$string(config.google_analytics_tracking_id)
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: 'google_site_verification',
																													_1: _elm_lang$core$Json_Encode$string(config.google_site_verification)
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														ctor: '_Tuple2',
																														_0: 'primary_email',
																														_1: _elm_lang$core$Json_Encode$string(config.primary_email)
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															ctor: '_Tuple2',
																															_0: 'password',
																															_1: _elm_lang$core$Json_Encode$string(config.google_site_verification)
																														},
																														_1: {ctor: '[]'}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$newWebsiteEncoder = function (newWebsite) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'website_acronym',
				_1: _elm_lang$core$Json_Encode$string(newWebsite.website_acronym)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'website_lower',
					_1: _elm_lang$core$Json_Encode$string(newWebsite.website_lower)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'website_capital',
						_1: _elm_lang$core$Json_Encode$string(newWebsite.website_capital)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'num_of_categories',
							_1: _elm_lang$core$Json_Encode$string(newWebsite.num_of_categories)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'c1_name',
								_1: _elm_lang$core$Json_Encode$string(newWebsite.c1_name)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'c1_display_name',
									_1: _elm_lang$core$Json_Encode$string(newWebsite.c1_display_name)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'c1_model',
										_1: _elm_lang$core$Json_Encode$string(newWebsite.c1_model)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'c1_icon',
											_1: _elm_lang$core$Json_Encode$string(newWebsite.c1_icon)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'c2_name',
												_1: _elm_lang$core$Json_Encode$string(newWebsite.c2_name)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'c2_display_name',
													_1: _elm_lang$core$Json_Encode$string(newWebsite.c2_display_name)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'c2_model',
														_1: _elm_lang$core$Json_Encode$string(newWebsite.c2_model)
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'c2_icon',
															_1: _elm_lang$core$Json_Encode$string(newWebsite.c2_icon)
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'c3_name',
																_1: _elm_lang$core$Json_Encode$string(newWebsite.c3_name)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'c3_display_name',
																	_1: _elm_lang$core$Json_Encode$string(newWebsite.c3_display_name)
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'c3_model',
																		_1: _elm_lang$core$Json_Encode$string(newWebsite.c3_model)
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 'c3_icon',
																			_1: _elm_lang$core$Json_Encode$string(newWebsite.c3_icon)
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: 'c4_name',
																				_1: _elm_lang$core$Json_Encode$string(newWebsite.c4_name)
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: 'c4_display_name',
																					_1: _elm_lang$core$Json_Encode$string(newWebsite.c4_display_name)
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: 'c4_model',
																						_1: _elm_lang$core$Json_Encode$string(newWebsite.c4_model)
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: 'c4_icon',
																							_1: _elm_lang$core$Json_Encode$string(newWebsite.c4_icon)
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: 'c5_name',
																								_1: _elm_lang$core$Json_Encode$string(newWebsite.c5_name)
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: 'c5_display_name',
																									_1: _elm_lang$core$Json_Encode$string(newWebsite.c5_display_name)
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: 'c5_model',
																										_1: _elm_lang$core$Json_Encode$string(newWebsite.c5_model)
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: 'c5_icon',
																											_1: _elm_lang$core$Json_Encode$string(newWebsite.c5_icon)
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: 'c6_name',
																												_1: _elm_lang$core$Json_Encode$string(newWebsite.c6_name)
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: 'c6_display_name',
																													_1: _elm_lang$core$Json_Encode$string(newWebsite.c6_display_name)
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														ctor: '_Tuple2',
																														_0: 'c6_model',
																														_1: _elm_lang$core$Json_Encode$string(newWebsite.c6_model)
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															ctor: '_Tuple2',
																															_0: 'c6_icon',
																															_1: _elm_lang$core$Json_Encode$string(newWebsite.c6_icon)
																														},
																														_1: {
																															ctor: '::',
																															_0: {
																																ctor: '_Tuple2',
																																_0: 'c7_name',
																																_1: _elm_lang$core$Json_Encode$string(newWebsite.c7_name)
																															},
																															_1: {
																																ctor: '::',
																																_0: {
																																	ctor: '_Tuple2',
																																	_0: 'c7_display_name',
																																	_1: _elm_lang$core$Json_Encode$string(newWebsite.c7_display_name)
																																},
																																_1: {
																																	ctor: '::',
																																	_0: {
																																		ctor: '_Tuple2',
																																		_0: 'c7_model',
																																		_1: _elm_lang$core$Json_Encode$string(newWebsite.c7_model)
																																	},
																																	_1: {
																																		ctor: '::',
																																		_0: {
																																			ctor: '_Tuple2',
																																			_0: 'c7_icon',
																																			_1: _elm_lang$core$Json_Encode$string(newWebsite.c7_icon)
																																		},
																																		_1: {ctor: '[]'}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$individualEnvDataEncoder = function (individualEnvData) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'mailgun_domain',
				_1: _elm_lang$core$Json_Encode$string(individualEnvData.mailgun_domain)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'amazon_s3_bucket_name',
					_1: _elm_lang$core$Json_Encode$string(individualEnvData.amazon_s3_bucket_name)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'recaptcha_public_key',
						_1: _elm_lang$core$Json_Encode$string(individualEnvData.recaptcha_public_key)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'recaptcha_private_key',
							_1: _elm_lang$core$Json_Encode$string(individualEnvData.recaptcha_private_key)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'twitter_api_key',
								_1: _elm_lang$core$Json_Encode$string(individualEnvData.twitter_api_key)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'twitter_secret_key',
									_1: _elm_lang$core$Json_Encode$string(individualEnvData.twitter_secret_key)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'twitter_access_token',
										_1: _elm_lang$core$Json_Encode$string(individualEnvData.twitter_access_token)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'twitter_access_token_secret',
											_1: _elm_lang$core$Json_Encode$string(individualEnvData.twitter_access_token_secret)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'facebook_api_key',
												_1: _elm_lang$core$Json_Encode$string(individualEnvData.facebook_api_key)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'facebook_secret_key',
													_1: _elm_lang$core$Json_Encode$string(individualEnvData.facebook_secret_key)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'facebook_page_id',
														_1: _elm_lang$core$Json_Encode$string(individualEnvData.facebook_page_id)
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'facebook_redirect_url',
															_1: _elm_lang$core$Json_Encode$string(individualEnvData.facebook_redirect_url)
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'tumblr_api_key',
																_1: _elm_lang$core$Json_Encode$string(individualEnvData.tumblr_api_key)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'tumblr_secret_key',
																	_1: _elm_lang$core$Json_Encode$string(individualEnvData.tumblr_secret_key)
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'tumblr_blog_identifier',
																		_1: _elm_lang$core$Json_Encode$string(individualEnvData.tumblr_blog_identifier)
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 'pintrest_api_key',
																			_1: _elm_lang$core$Json_Encode$string(individualEnvData.pintrest_api_key)
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: 'pintrest_secret_key',
																				_1: _elm_lang$core$Json_Encode$string(individualEnvData.pintrest_secret_key)
																			},
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$commonEnvDataEncoder = function (commonEnvData) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'mailgun_key',
				_1: _elm_lang$core$Json_Encode$string(commonEnvData.mailgun_key)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'amazon_associate_tag',
					_1: _elm_lang$core$Json_Encode$string(commonEnvData.amazon_associate_tag)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'aws_access_key_id',
						_1: _elm_lang$core$Json_Encode$string(commonEnvData.aws_access_key_id)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'aws_secret_access_key',
							_1: _elm_lang$core$Json_Encode$string(commonEnvData.aws_secret_access_key)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'marketplace_host',
								_1: _elm_lang$core$Json_Encode$string(commonEnvData.marketplace_host)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'amazon_s3_access_key',
									_1: _elm_lang$core$Json_Encode$string(commonEnvData.amazon_s3_access_key)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'amazon_s3_secret_access_key',
										_1: _elm_lang$core$Json_Encode$string(commonEnvData.amazon_s3_secret_access_key)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'etsy_api_key',
											_1: _elm_lang$core$Json_Encode$string(commonEnvData.etsy_api_key)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'etsy_secret_key',
												_1: _elm_lang$core$Json_Encode$string(commonEnvData.etsy_secret_key)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'tumblr_access_token',
													_1: _elm_lang$core$Json_Encode$string(commonEnvData.tumblr_access_token)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'tumblr_access_token_secret',
														_1: _elm_lang$core$Json_Encode$string(commonEnvData.tumblr_access_token_secret)
													},
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$consoleItemTypeString = function (consoleItemType) {
	var _p2 = consoleItemType;
	switch (_p2.ctor) {
		case 'NewSession':
			return 'new_session';
		case 'Begin':
			return 'begin';
		case 'Toggle':
			return 'toggle';
		case 'Load':
			return 'load';
		case 'NonExistent':
			return 'non_existent';
		case 'Success':
			return 'success';
		default:
			return 'failure';
	}
};
var _user$project$Model_ModelEncode$consoleItemEncoder = function (consoleItem) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'inserted_at',
				_1: _elm_lang$core$Json_Encode$string(consoleItem.inserted_at)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'command',
					_1: _elm_lang$core$Json_Encode$string(consoleItem.command)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'console_type',
						_1: _elm_lang$core$Json_Encode$string(
							_user$project$Model_ModelEncode$consoleItemTypeString(consoleItem.console_type))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'text',
							_1: _elm_lang$core$Json_Encode$string(consoleItem.text)
						},
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _user$project$Model_ModelEncode$consoleItemWrapperEncoder = function (consoleItem) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'message',
				_1: _user$project$Model_ModelEncode$consoleItemEncoder(consoleItem)
			},
			_1: {ctor: '[]'}
		});
};

var _user$project$Model_ModelOverview$GoogleAnalyticsItem = F6(
	function (a, b, c, d, e, f) {
		return {domain: a, today: b, yesterday: c, week: d, month: e, link: f};
	});
var _user$project$Model_ModelOverview$DomainExpirationItem = F5(
	function (a, b, c, d, e) {
		return {domain: a, daysTillExpiration: b, expirationDate: c, autoRenewStatus: d, renew: e};
	});
var _user$project$Model_ModelOverview$WebsitesItem = F7(
	function (a, b, c, d, e, f, g) {
		return {name: a, acronym: b, total_products: c, total_products_week: d, total_products_month: e, total_products_draft: f, total_posts: g};
	});

var _user$project$Model_ModelDevelopment$ServerStatusItem = F2(
	function (a, b) {
		return {status: a, acronym: b};
	});
var _user$project$Model_ModelDevelopment$CommandItem = F5(
	function (a, b, c, d, e) {
		return {name: a, key: b, script: c, command: d, commandType: e};
	});
var _user$project$Model_ModelDevelopment$BuildSingle = {ctor: 'BuildSingle'};
var _user$project$Model_ModelDevelopment$TransferImages = {ctor: 'TransferImages'};
var _user$project$Model_ModelDevelopment$SourceSingle = {ctor: 'SourceSingle'};
var _user$project$Model_ModelDevelopment$SourceAll = {ctor: 'SourceAll'};
var _user$project$Model_ModelDevelopment$SeedSingle = {ctor: 'SeedSingle'};
var _user$project$Model_ModelDevelopment$SeedAll = {ctor: 'SeedAll'};
var _user$project$Model_ModelDevelopment$StopSingle = {ctor: 'StopSingle'};
var _user$project$Model_ModelDevelopment$StopAll = {ctor: 'StopAll'};
var _user$project$Model_ModelDevelopment$StartSingle = {ctor: 'StartSingle'};
var _user$project$Model_ModelDevelopment$RestartSingle = {ctor: 'RestartSingle'};
var _user$project$Model_ModelDevelopment$PushAwfulManager = {ctor: 'PushAwfulManager'};
var _user$project$Model_ModelDevelopment$PushSingle = {ctor: 'PushSingle'};
var _user$project$Model_ModelDevelopment$PushAll = {ctor: 'PushAll'};
var _user$project$Model_ModelDevelopment$PullSingle = {ctor: 'PullSingle'};
var _user$project$Model_ModelDevelopment$PullAll = {ctor: 'PullAll'};
var _user$project$Model_ModelDevelopment$UpdateIndividualConfig = {ctor: 'UpdateIndividualConfig'};
var _user$project$Model_ModelDevelopment$UpdateCommonConfig = {ctor: 'UpdateCommonConfig'};
var _user$project$Model_ModelDevelopment$UpdateEnvConfig = {ctor: 'UpdateEnvConfig'};
var _user$project$Model_ModelDevelopment$UpdateSingle = {ctor: 'UpdateSingle'};
var _user$project$Model_ModelDevelopment$UpdateAll = {ctor: 'UpdateAll'};
var _user$project$Model_ModelDevelopment$CheckServerStatus = {ctor: 'CheckServerStatus'};
var _user$project$Model_ModelDevelopment$EctoResetAll = {ctor: 'EctoResetAll'};
var _user$project$Model_ModelDevelopment$EctoMigrateAll = {ctor: 'EctoMigrateAll'};
var _user$project$Model_ModelDevelopment$EctoCreateAll = {ctor: 'EctoCreateAll'};
var _user$project$Model_ModelDevelopment$DeleteSingle = {ctor: 'DeleteSingle'};
var _user$project$Model_ModelDevelopment$DeleteAll = {ctor: 'DeleteAll'};
var _user$project$Model_ModelDevelopment$CompileSingle = {ctor: 'CompileSingle'};
var _user$project$Model_ModelDevelopment$CompileAll = {ctor: 'CompileAll'};
var _user$project$Model_ModelDevelopment$DURC = {ctor: 'DURC'};
var _user$project$Model_ModelDevelopment$DUR = {ctor: 'DUR'};
var _user$project$Model_ModelDevelopment$Production = {ctor: 'Production'};
var _user$project$Model_ModelDevelopment$Development = {ctor: 'Development'};
var _user$project$Model_ModelDevelopment$DevelopmentAndProduction = {ctor: 'DevelopmentAndProduction'};

var _user$project$Model_ModelMessage$ProductAssocMESSAGE = F2(
	function (a, b) {
		return {product: a, message: b};
	});
var _user$project$Model_ModelMessage$NewProductMESSAGE = F2(
	function (a, b) {
		return {product: a, message: b};
	});
var _user$project$Model_ModelMessage$ProductFormMESSAGE = F2(
	function (a, b) {
		return {product: a, message: b};
	});
var _user$project$Model_ModelMessage$SocialFormMESSAGE = F2(
	function (a, b) {
		return {prefil: a, message: b};
	});
var _user$project$Model_ModelMessage$SocialMediaPrefilMESSAGE = F2(
	function (a, b) {
		return {prefil: a, message: b};
	});
var _user$project$Model_ModelMessage$ConfigEnvDataMESSAGE = F2(
	function (a, b) {
		return {config: a, message: b};
	});
var _user$project$Model_ModelMessage$WebsitesItemMESSAGEList = F2(
	function (a, b) {
		return {websites: a, message: b};
	});
var _user$project$Model_ModelMessage$ServerStatusMESSAGEList = F3(
	function (a, b, c) {
		return {serverStatusList: a, status_type: b, message: c};
	});
var _user$project$Model_ModelMessage$IndividualEnvMESSAGEData = F2(
	function (a, b) {
		return {individualEnvData: a, message: b};
	});
var _user$project$Model_ModelMessage$GoogleAnalyticsItemMESSAGEList = F2(
	function (a, b) {
		return {googleAnalytics: a, message: b};
	});
var _user$project$Model_ModelMessage$DomainExpirationItemMESSAGEList = F2(
	function (a, b) {
		return {domainExpirations: a, message: b};
	});
var _user$project$Model_ModelMessage$CommonEnvMESSAGEData = F2(
	function (a, b) {
		return {commonEnvData: a, message: b};
	});
var _user$project$Model_ModelMessage$ConsoleItemMESSAGEList = F2(
	function (a, b) {
		return {messages: a, message: b};
	});

var _user$project$Model_ModelDecode$newProductDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'url',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'price',
		_elm_lang$core$Json_Decode$float,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'featured_image',
			_elm_lang$core$Json_Decode$string,
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$NewProduct))));
var _user$project$Model_ModelDecode$socialMediaPrefilDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'description',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'url',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'featured_image',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'display_name',
				_elm_lang$core$Json_Decode$string,
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMisc$SocialMediaPrefil)))));
var _user$project$Model_ModelDecode$postDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'product_offset',
	_elm_lang$core$Json_Decode$nullable(_elm_lang$core$Json_Decode$int),
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'product_limit',
		_elm_lang$core$Json_Decode$nullable(_elm_lang$core$Json_Decode$int),
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'post_type',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'featured_image',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'excerpt',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'author',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'display_name',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'name',
								_elm_lang$core$Json_Decode$string,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'id',
									_elm_lang$core$Json_Decode$string,
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$Post))))))))));
var _user$project$Model_ModelDecode$likeDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'total',
	_elm_lang$core$Json_Decode$int,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'id',
		_elm_lang$core$Json_Decode$string,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$Like)));
var _user$project$Model_ModelDecode$categoryDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'icon',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'description',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'display_name',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'name',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'id',
					_elm_lang$core$Json_Decode$string,
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$Category))))));
var _user$project$Model_ModelDecode$tagDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'description',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'display_name',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'name',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'id',
				_elm_lang$core$Json_Decode$string,
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$Tag)))));
var _user$project$Model_ModelDecode$postAssocDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'product_offset',
	_elm_lang$core$Json_Decode$nullable(_elm_lang$core$Json_Decode$int),
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'product_limit',
		_elm_lang$core$Json_Decode$nullable(_elm_lang$core$Json_Decode$int),
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'tag',
			_elm_lang$core$Json_Decode$nullable(_user$project$Model_ModelDecode$tagDecoder),
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'post_type',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'featured_image',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'excerpt',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'author',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'display_name',
								_elm_lang$core$Json_Decode$string,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'name',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'id',
										_elm_lang$core$Json_Decode$string,
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$PostAssoc)))))))))));
var _user$project$Model_ModelDecode$tagAssocListDecoder = _elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$tagDecoder);
var _user$project$Model_ModelDecode$scheduleDateDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'year',
	_elm_lang$core$Json_Decode$int,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'month',
		_elm_lang$core$Json_Decode$int,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'day',
			_elm_lang$core$Json_Decode$int,
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$ScheduleDate))));
var _user$project$Model_ModelDecode$productDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'url_text',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'url',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'product_type',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'price',
				_elm_lang$core$Json_Decode$float,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'cta',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'draft',
						_elm_lang$core$Json_Decode$bool,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'schedule_date',
							_user$project$Model_ModelDecode$scheduleDateDecoder,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'featured_image',
								_elm_lang$core$Json_Decode$string,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'blog_description',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'description',
										_elm_lang$core$Json_Decode$string,
										A3(
											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
											'display_name',
											_elm_lang$core$Json_Decode$string,
											A3(
												_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
												'name',
												_elm_lang$core$Json_Decode$string,
												A3(
													_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
													'id',
													_elm_lang$core$Json_Decode$string,
													_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$Product))))))))))))));
var _user$project$Model_ModelDecode$tagAssocDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'posts',
	_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$postDecoder),
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'products',
		_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$productDecoder),
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'description',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'display_name',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'name',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'id',
						_elm_lang$core$Json_Decode$string,
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$TagAssoc)))))));
var _user$project$Model_ModelDecode$updateDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'schedule_date',
	_user$project$Model_ModelDecode$scheduleDateDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'draft',
		_elm_lang$core$Json_Decode$bool,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'author',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'excerpt',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'title',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'display_name',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'name',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'id',
								_elm_lang$core$Json_Decode$string,
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$Update)))))))));
var _user$project$Model_ModelDecode$productFormDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'product_type',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'product_like',
		_elm_lang$core$Json_Decode$int,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'tag_id',
			_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string),
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'category_id',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'category',
					_user$project$Model_ModelDecode$categoryDecoder,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'url_text',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'url',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'price',
								_elm_lang$core$Json_Decode$float,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'cta',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'schedule_date',
										_user$project$Model_ModelDecode$scheduleDateDecoder,
										A3(
											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
											'draft',
											_elm_lang$core$Json_Decode$bool,
											A3(
												_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
												'featured_image',
												_elm_lang$core$Json_Decode$string,
												A3(
													_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
													'original_featured_image',
													_elm_lang$core$Json_Decode$string,
													A3(
														_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
														'blog_description',
														_elm_lang$core$Json_Decode$string,
														A3(
															_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
															'description',
															_elm_lang$core$Json_Decode$string,
															A3(
																_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																'display_name',
																_elm_lang$core$Json_Decode$string,
																_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$ProductForm)))))))))))))))));
var _user$project$Model_ModelDecode$socialFormDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'social_media_type',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'image_caption',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'url',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'featured_image',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'facebook_code',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'schedule_date',
						_user$project$Model_ModelDecode$scheduleDateDecoder,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'draft',
							_elm_lang$core$Json_Decode$bool,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'tags',
								_elm_lang$core$Json_Decode$string,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'description',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'display_name',
										_elm_lang$core$Json_Decode$string,
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$SocialForm)))))))))));
var _user$project$Model_ModelDecode$socialDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'tags',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'social_media_type',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'image_caption',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'image_caption',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'featured_image',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'facebook_code',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'schedule_date',
							_user$project$Model_ModelDecode$scheduleDateDecoder,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'draft',
								_elm_lang$core$Json_Decode$bool,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'url',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'display_name',
										_elm_lang$core$Json_Decode$string,
										A3(
											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
											'description',
											_elm_lang$core$Json_Decode$string,
											A3(
												_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
												'name',
												_elm_lang$core$Json_Decode$string,
												A3(
													_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
													'id',
													_elm_lang$core$Json_Decode$string,
													_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$Social))))))))))))));
var _user$project$Model_ModelDecode$productAssocDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'product_like',
	_user$project$Model_ModelDecode$likeDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'product_tags',
		_user$project$Model_ModelDecode$tagAssocListDecoder,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'category',
			_user$project$Model_ModelDecode$categoryDecoder,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'inserted_at',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'url_text',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'url',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'product_type',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'price',
								_elm_lang$core$Json_Decode$float,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'cta',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'draft',
										_elm_lang$core$Json_Decode$bool,
										A3(
											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
											'schedule_date',
											_user$project$Model_ModelDecode$scheduleDateDecoder,
											A3(
												_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
												'featured_image',
												_elm_lang$core$Json_Decode$string,
												A3(
													_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
													'blog_description',
													_elm_lang$core$Json_Decode$string,
													A3(
														_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
														'description',
														_elm_lang$core$Json_Decode$string,
														A3(
															_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
															'display_name',
															_elm_lang$core$Json_Decode$string,
															A3(
																_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																'name',
																_elm_lang$core$Json_Decode$string,
																A3(
																	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																	'id',
																	_elm_lang$core$Json_Decode$string,
																	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelProduct$ProductAssoc))))))))))))))))));
var _user$project$Model_ModelDecode$serverStatusDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'acronym',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'status',
		_elm_lang$core$Json_Decode$bool,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelDevelopment$ServerStatusItem)));
var _user$project$Model_ModelDecode$messageTypeDecoder = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (str) {
		var _p0 = str;
		switch (_p0) {
			case 'new_session':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model_ModelMisc$NewSession);
			case 'begin':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model_ModelMisc$Begin);
			case 'non_existent':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model_ModelMisc$NonExistent);
			case 'toggle':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model_ModelMisc$Toggle);
			case 'load':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model_ModelMisc$Load);
			case 'success':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model_ModelMisc$Success);
			case 'failure':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model_ModelMisc$Failure);
			default:
				return _elm_lang$core$Json_Decode$fail(
					A2(_elm_lang$core$Basics_ops['++'], 'Unknown theme: ', _p0));
		}
	},
	_elm_lang$core$Json_Decode$string);
var _user$project$Model_ModelDecode$messageDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'text',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'console_type',
		_user$project$Model_ModelDecode$messageTypeDecoder,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'command',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'inserted_at',
				_elm_lang$core$Json_Decode$string,
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMisc$ConsoleItem)))));
var _user$project$Model_ModelDecode$serverStatusMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'status_type',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'serverStatusList',
			_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$serverStatusDecoder),
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$ServerStatusMESSAGEList))));
var _user$project$Model_ModelDecode$websiteIndividualDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'updates',
		_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$updateDecoder),
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'social',
			_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$socialDecoder),
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'productsDraft',
				_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$productDecoder),
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'posts',
					_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$postAssocDecoder),
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'tagsAssoc',
						_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$tagAssocDecoder),
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'categories',
							_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$categoryDecoder),
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'productsAssoc',
								_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$productAssocDecoder),
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMisc$WebsiteIndividualData)))))))));
var _user$project$Model_ModelDecode$productAssocMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'product',
		_user$project$Model_ModelDecode$productAssocDecoder,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$ProductAssocMESSAGE)));
var _user$project$Model_ModelDecode$productFormMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'productAssoc',
		_user$project$Model_ModelDecode$productFormDecoder,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$ProductFormMESSAGE)));
var _user$project$Model_ModelDecode$newProductMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'product',
		_user$project$Model_ModelDecode$newProductDecoder,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$NewProductMESSAGE)));
var _user$project$Model_ModelDecode$socialFormMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'prefil',
		_user$project$Model_ModelDecode$socialFormDecoder,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$SocialFormMESSAGE)));
var _user$project$Model_ModelDecode$messageListDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'messages',
		_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$messageDecoder),
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$ConsoleItemMESSAGEList)));
var _user$project$Model_ModelDecode$configDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'password',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'primary_email',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'google_site_verification',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'google_analytics_tracking_id',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'letter_copy',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'submit_copy',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'about_copy',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'search_meta_description',
								_elm_lang$core$Json_Decode$string,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'register_meta_description',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'login_meta_description',
										_elm_lang$core$Json_Decode$string,
										A3(
											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
											'submit_meta_description',
											_elm_lang$core$Json_Decode$string,
											A3(
												_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
												'contact_meta_description',
												_elm_lang$core$Json_Decode$string,
												A3(
													_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
													'about_meta_description',
													_elm_lang$core$Json_Decode$string,
													A3(
														_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
														'updates_meta_description',
														_elm_lang$core$Json_Decode$string,
														A3(
															_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
															'categories_meta_description',
															_elm_lang$core$Json_Decode$string,
															A3(
																_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																'blog_meta_description',
																_elm_lang$core$Json_Decode$string,
																A3(
																	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																	'website_alt_image',
																	_elm_lang$core$Json_Decode$string,
																	A3(
																		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																		'website_twitter',
																		_elm_lang$core$Json_Decode$string,
																		A3(
																			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																			'website_keywords',
																			_elm_lang$core$Json_Decode$string,
																			A3(
																				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																				'website_description',
																				_elm_lang$core$Json_Decode$string,
																				A3(
																					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																					'website_title',
																					_elm_lang$core$Json_Decode$string,
																					A3(
																						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																						'website_favicon',
																						_elm_lang$core$Json_Decode$string,
																						A3(
																							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																							'website_logo_svg',
																							_elm_lang$core$Json_Decode$string,
																							A3(
																								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																								'website_logo_png',
																								_elm_lang$core$Json_Decode$string,
																								A3(
																									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																									'website_domain',
																									_elm_lang$core$Json_Decode$string,
																									A3(
																										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																										'website_name_lower',
																										_elm_lang$core$Json_Decode$string,
																										A3(
																											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																											'website_name',
																											_elm_lang$core$Json_Decode$string,
																											A3(
																												_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																												'website_acronym',
																												_elm_lang$core$Json_Decode$string,
																												_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelConfig$ConfigEnvData)))))))))))))))))))))))))))));
var _user$project$Model_ModelDecode$configMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'config',
		_user$project$Model_ModelDecode$configDecoder,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$ConfigEnvDataMESSAGE)));
var _user$project$Model_ModelDecode$websitesItemDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'total_posts',
	_elm_lang$core$Json_Decode$int,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'total_products_draft',
		_elm_lang$core$Json_Decode$int,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'total_products_month',
			_elm_lang$core$Json_Decode$int,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'total_products_week',
				_elm_lang$core$Json_Decode$int,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'total_products',
					_elm_lang$core$Json_Decode$int,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'acronym',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'name',
							_elm_lang$core$Json_Decode$string,
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelOverview$WebsitesItem))))))));
var _user$project$Model_ModelDecode$websitesItemMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'websites',
		_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$websitesItemDecoder),
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$WebsitesItemMESSAGEList)));
var _user$project$Model_ModelDecode$individualEnvDataDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'pintrest_secret_key',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'pintrest_api_key',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'tumblr_blog_identifier',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'tumblr_secret_key',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'tumblr_api_key',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'facebook_redirect_url',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'facebook_page_id',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'facebook_secret_key',
								_elm_lang$core$Json_Decode$string,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'facebook_api_key',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'twitter_access_token_secret',
										_elm_lang$core$Json_Decode$string,
										A3(
											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
											'twitter_access_token',
											_elm_lang$core$Json_Decode$string,
											A3(
												_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
												'twitter_secret_key',
												_elm_lang$core$Json_Decode$string,
												A3(
													_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
													'twitter_api_key',
													_elm_lang$core$Json_Decode$string,
													A3(
														_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
														'recaptcha_private_key',
														_elm_lang$core$Json_Decode$string,
														A3(
															_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
															'recaptcha_public_key',
															_elm_lang$core$Json_Decode$string,
															A3(
																_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																'amazon_s3_bucket_name',
																_elm_lang$core$Json_Decode$string,
																A3(
																	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
																	'mailgun_domain',
																	_elm_lang$core$Json_Decode$string,
																	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelConfig$IndividualEnvData))))))))))))))))));
var _user$project$Model_ModelDecode$individualEnvMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'individualEnv',
		_user$project$Model_ModelDecode$individualEnvDataDecoder,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$IndividualEnvMESSAGEData)));
var _user$project$Model_ModelDecode$commonEnvDataDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'tumblr_access_token_secret',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'tumblr_access_token',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'etsy_secret_key',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'etsy_api_key',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'amazon_s3_secret_access_key',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'amazon_s3_access_key',
						_elm_lang$core$Json_Decode$string,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'marketplace_host',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'aws_secret_access_key',
								_elm_lang$core$Json_Decode$string,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'aws_access_key_id',
									_elm_lang$core$Json_Decode$string,
									A3(
										_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
										'amazon_associate_tag',
										_elm_lang$core$Json_Decode$string,
										A3(
											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
											'mailgun_key',
											_elm_lang$core$Json_Decode$string,
											_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelConfig$CommonEnvData))))))))))));
var _user$project$Model_ModelDecode$commonEnvMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'commonEnv',
		_user$project$Model_ModelDecode$commonEnvDataDecoder,
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$CommonEnvMESSAGEData)));
var _user$project$Model_ModelDecode$domainExpirationDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'renew',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'autoRenewStatus',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'expirationDate',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'daysTillExpiration',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'domain',
					_elm_lang$core$Json_Decode$string,
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelOverview$DomainExpirationItem))))));
var _user$project$Model_ModelDecode$domainExpirationMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'domainExpirations',
		_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$domainExpirationDecoder),
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$DomainExpirationItemMESSAGEList)));
var _user$project$Model_ModelDecode$googleAnalyticsDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'yesterday',
	_elm_lang$core$Json_Decode$string,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'week',
		_elm_lang$core$Json_Decode$string,
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'today',
			_elm_lang$core$Json_Decode$string,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'month',
				_elm_lang$core$Json_Decode$string,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'link',
					_elm_lang$core$Json_Decode$string,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'domain',
						_elm_lang$core$Json_Decode$string,
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelOverview$GoogleAnalyticsItem)))))));
var _user$project$Model_ModelDecode$googleAnalyticsMESSAGEDecoder = A3(
	_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
	'message',
	_user$project$Model_ModelDecode$messageDecoder,
	A3(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
		'googleAnalytics',
		_elm_lang$core$Json_Decode$list(_user$project$Model_ModelDecode$googleAnalyticsDecoder),
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model_ModelMessage$GoogleAnalyticsItemMESSAGEList)));

var _user$project$Model_ModelDataType$SocialDataFormType = function (a) {
	return {ctor: 'SocialDataFormType', _0: a};
};
var _user$project$Model_ModelDataType$UpdateDataFormType = function (a) {
	return {ctor: 'UpdateDataFormType', _0: a};
};
var _user$project$Model_ModelDataType$TagDataFormType = function (a) {
	return {ctor: 'TagDataFormType', _0: a};
};
var _user$project$Model_ModelDataType$PostDataFormType = function (a) {
	return {ctor: 'PostDataFormType', _0: a};
};
var _user$project$Model_ModelDataType$ProductDataFormType = function (a) {
	return {ctor: 'ProductDataFormType', _0: a};
};
var _user$project$Model_ModelDataType$SocialDataViewType = function (a) {
	return {ctor: 'SocialDataViewType', _0: a};
};
var _user$project$Model_ModelDataType$UpdateDataViewType = function (a) {
	return {ctor: 'UpdateDataViewType', _0: a};
};
var _user$project$Model_ModelDataType$TagDataViewType = function (a) {
	return {ctor: 'TagDataViewType', _0: a};
};
var _user$project$Model_ModelDataType$PostDataViewType = function (a) {
	return {ctor: 'PostDataViewType', _0: a};
};
var _user$project$Model_ModelDataType$ProductDataViewType = function (a) {
	return {ctor: 'ProductDataViewType', _0: a};
};

var _user$project$Model_ModelFormType$C7Icon = {ctor: 'C7Icon'};
var _user$project$Model_ModelFormType$C7Model = {ctor: 'C7Model'};
var _user$project$Model_ModelFormType$C7DisplayName = {ctor: 'C7DisplayName'};
var _user$project$Model_ModelFormType$C7Name = {ctor: 'C7Name'};
var _user$project$Model_ModelFormType$C5Icon = {ctor: 'C5Icon'};
var _user$project$Model_ModelFormType$C5Model = {ctor: 'C5Model'};
var _user$project$Model_ModelFormType$C5DisplayName = {ctor: 'C5DisplayName'};
var _user$project$Model_ModelFormType$C5Name = {ctor: 'C5Name'};
var _user$project$Model_ModelFormType$C3Icon = {ctor: 'C3Icon'};
var _user$project$Model_ModelFormType$C3Model = {ctor: 'C3Model'};
var _user$project$Model_ModelFormType$C3DisplayName = {ctor: 'C3DisplayName'};
var _user$project$Model_ModelFormType$C3Name = {ctor: 'C3Name'};
var _user$project$Model_ModelFormType$C1Icon = {ctor: 'C1Icon'};
var _user$project$Model_ModelFormType$C1Model = {ctor: 'C1Model'};
var _user$project$Model_ModelFormType$C1DisplayName = {ctor: 'C1DisplayName'};
var _user$project$Model_ModelFormType$C1Name = {ctor: 'C1Name'};
var _user$project$Model_ModelFormType$C6Icon = {ctor: 'C6Icon'};
var _user$project$Model_ModelFormType$C6Model = {ctor: 'C6Model'};
var _user$project$Model_ModelFormType$C6DisplayName = {ctor: 'C6DisplayName'};
var _user$project$Model_ModelFormType$C6Name = {ctor: 'C6Name'};
var _user$project$Model_ModelFormType$C4Icon = {ctor: 'C4Icon'};
var _user$project$Model_ModelFormType$C4Model = {ctor: 'C4Model'};
var _user$project$Model_ModelFormType$C4DisplayName = {ctor: 'C4DisplayName'};
var _user$project$Model_ModelFormType$C4Name = {ctor: 'C4Name'};
var _user$project$Model_ModelFormType$C2Icon = {ctor: 'C2Icon'};
var _user$project$Model_ModelFormType$C2Model = {ctor: 'C2Model'};
var _user$project$Model_ModelFormType$C2DisplayName = {ctor: 'C2DisplayName'};
var _user$project$Model_ModelFormType$C2Name = {ctor: 'C2Name'};
var _user$project$Model_ModelFormType$NumOfCategories = {ctor: 'NumOfCategories'};
var _user$project$Model_ModelFormType$WebsiteCapital = {ctor: 'WebsiteCapital'};
var _user$project$Model_ModelFormType$WebsiteLower = {ctor: 'WebsiteLower'};
var _user$project$Model_ModelFormType$WebsiteAcronym = {ctor: 'WebsiteAcronym'};
var _user$project$Model_ModelFormType$CommonEnvFormTumblrAccessTokenSecret = {ctor: 'CommonEnvFormTumblrAccessTokenSecret'};
var _user$project$Model_ModelFormType$CommonEnvFormTumblrAccessToken = {ctor: 'CommonEnvFormTumblrAccessToken'};
var _user$project$Model_ModelFormType$CommonEnvFormEtsySecretKey = {ctor: 'CommonEnvFormEtsySecretKey'};
var _user$project$Model_ModelFormType$CommonEnvFormEtsyApiKey = {ctor: 'CommonEnvFormEtsyApiKey'};
var _user$project$Model_ModelFormType$CommonEnvFormAmazonS3SecretAccessKey = {ctor: 'CommonEnvFormAmazonS3SecretAccessKey'};
var _user$project$Model_ModelFormType$CommonEnvFormAmazonS3AccessKey = {ctor: 'CommonEnvFormAmazonS3AccessKey'};
var _user$project$Model_ModelFormType$CommonEnvFormMarketplaceHost = {ctor: 'CommonEnvFormMarketplaceHost'};
var _user$project$Model_ModelFormType$CommonEnvFormAwsSecretAccessKey = {ctor: 'CommonEnvFormAwsSecretAccessKey'};
var _user$project$Model_ModelFormType$CommonEnvFormAwsAccessKeyId = {ctor: 'CommonEnvFormAwsAccessKeyId'};
var _user$project$Model_ModelFormType$CommonEnvFormAmazonAssociateTag = {ctor: 'CommonEnvFormAmazonAssociateTag'};
var _user$project$Model_ModelFormType$CommonEnvFormMailgunKey = {ctor: 'CommonEnvFormMailgunKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormPintrestSecretKey = {ctor: 'IndividualEnvFormPintrestSecretKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormPintrestApiKey = {ctor: 'IndividualEnvFormPintrestApiKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormTumblrBlogIdentifier = {ctor: 'IndividualEnvFormTumblrBlogIdentifier'};
var _user$project$Model_ModelFormType$IndividualEnvFormTumblrSecretKey = {ctor: 'IndividualEnvFormTumblrSecretKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormTumblrApiKey = {ctor: 'IndividualEnvFormTumblrApiKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormFacebookRedirectUrl = {ctor: 'IndividualEnvFormFacebookRedirectUrl'};
var _user$project$Model_ModelFormType$IndividualEnvFormFacebookPageId = {ctor: 'IndividualEnvFormFacebookPageId'};
var _user$project$Model_ModelFormType$IndividualEnvFormFacebookSecretKey = {ctor: 'IndividualEnvFormFacebookSecretKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormFacebookApiKey = {ctor: 'IndividualEnvFormFacebookApiKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormTwitterAccessTokenSecret = {ctor: 'IndividualEnvFormTwitterAccessTokenSecret'};
var _user$project$Model_ModelFormType$IndividualEnvFormTwitterAccessToken = {ctor: 'IndividualEnvFormTwitterAccessToken'};
var _user$project$Model_ModelFormType$IndividualEnvFormTwitterSecretKey = {ctor: 'IndividualEnvFormTwitterSecretKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormTwitterApiKey = {ctor: 'IndividualEnvFormTwitterApiKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormRecaptchaPrivateKey = {ctor: 'IndividualEnvFormRecaptchaPrivateKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormRecaptchaPublicKey = {ctor: 'IndividualEnvFormRecaptchaPublicKey'};
var _user$project$Model_ModelFormType$IndividualEnvFormAmazonS3BucketName = {ctor: 'IndividualEnvFormAmazonS3BucketName'};
var _user$project$Model_ModelFormType$IndividualEnvFormMailgunDomain = {ctor: 'IndividualEnvFormMailgunDomain'};
var _user$project$Model_ModelFormType$ConfigFormPassword = {ctor: 'ConfigFormPassword'};
var _user$project$Model_ModelFormType$ConfigFormPrimaryEmail = {ctor: 'ConfigFormPrimaryEmail'};
var _user$project$Model_ModelFormType$ConfigFormGoogleSiteVerification = {ctor: 'ConfigFormGoogleSiteVerification'};
var _user$project$Model_ModelFormType$ConfigFormGoogleAnalyticsTrackingId = {ctor: 'ConfigFormGoogleAnalyticsTrackingId'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteFavicon = {ctor: 'ConfigFormWebsiteFavicon'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteLogoSvg = {ctor: 'ConfigFormWebsiteLogoSvg'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteLogoPng = {ctor: 'ConfigFormWebsiteLogoPng'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteDomain = {ctor: 'ConfigFormWebsiteDomain'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteNameLower = {ctor: 'ConfigFormWebsiteNameLower'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteName = {ctor: 'ConfigFormWebsiteName'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteAcronym = {ctor: 'ConfigFormWebsiteAcronym'};
var _user$project$Model_ModelFormType$ConfigFormLetterCopy = {ctor: 'ConfigFormLetterCopy'};
var _user$project$Model_ModelFormType$ConfigFormSubmitCopy = {ctor: 'ConfigFormSubmitCopy'};
var _user$project$Model_ModelFormType$ConfigFormAboutCopy = {ctor: 'ConfigFormAboutCopy'};
var _user$project$Model_ModelFormType$ConfigFormSearchMetaDescription = {ctor: 'ConfigFormSearchMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormRegisterMetaDescription = {ctor: 'ConfigFormRegisterMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormLoginMetaDescription = {ctor: 'ConfigFormLoginMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormSubmitMetaDescription = {ctor: 'ConfigFormSubmitMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormContactMetaDescription = {ctor: 'ConfigFormContactMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormAboutMetaDescription = {ctor: 'ConfigFormAboutMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormUpdatesMetaDescription = {ctor: 'ConfigFormUpdatesMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormCategoriesMetaDescription = {ctor: 'ConfigFormCategoriesMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormBlogMetaDescription = {ctor: 'ConfigFormBlogMetaDescription'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteAltImage = {ctor: 'ConfigFormWebsiteAltImage'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteTwitter = {ctor: 'ConfigFormWebsiteTwitter'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteKeywords = {ctor: 'ConfigFormWebsiteKeywords'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteDescription = {ctor: 'ConfigFormWebsiteDescription'};
var _user$project$Model_ModelFormType$ConfigFormWebsiteTitle = {ctor: 'ConfigFormWebsiteTitle'};
var _user$project$Model_ModelFormType$NoProductFormField = {ctor: 'NoProductFormField'};
var _user$project$Model_ModelFormType$ProductFormProductType = {ctor: 'ProductFormProductType'};
var _user$project$Model_ModelFormType$ProductFormLikeTotal = {ctor: 'ProductFormLikeTotal'};
var _user$project$Model_ModelFormType$ProductFormCta = {ctor: 'ProductFormCta'};
var _user$project$Model_ModelFormType$ProductFormPrice = {ctor: 'ProductFormPrice'};
var _user$project$Model_ModelFormType$ProductFormFeaturedImage = {ctor: 'ProductFormFeaturedImage'};
var _user$project$Model_ModelFormType$ProductFormUrlText = {ctor: 'ProductFormUrlText'};
var _user$project$Model_ModelFormType$ProductFormUrl = {ctor: 'ProductFormUrl'};
var _user$project$Model_ModelFormType$ProductFormOriginalFeaturedImage = {ctor: 'ProductFormOriginalFeaturedImage'};
var _user$project$Model_ModelFormType$ProductFormTag = {ctor: 'ProductFormTag'};
var _user$project$Model_ModelFormType$ProductFormCategory = {ctor: 'ProductFormCategory'};
var _user$project$Model_ModelFormType$ProductFormScheduleDate = {ctor: 'ProductFormScheduleDate'};
var _user$project$Model_ModelFormType$ProductFormDraft = {ctor: 'ProductFormDraft'};
var _user$project$Model_ModelFormType$ProductFormBlogDescription = {ctor: 'ProductFormBlogDescription'};
var _user$project$Model_ModelFormType$ProductFormDescription = {ctor: 'ProductFormDescription'};
var _user$project$Model_ModelFormType$ProductFormDisplayName = {ctor: 'ProductFormDisplayName'};
var _user$project$Model_ModelFormType$NoPostFormField = {ctor: 'NoPostFormField'};
var _user$project$Model_ModelFormType$PostFormFeaturedImage = {ctor: 'PostFormFeaturedImage'};
var _user$project$Model_ModelFormType$PostFormProductOffset = {ctor: 'PostFormProductOffset'};
var _user$project$Model_ModelFormType$PostFormProductLimit = {ctor: 'PostFormProductLimit'};
var _user$project$Model_ModelFormType$PostFormTag = {ctor: 'PostFormTag'};
var _user$project$Model_ModelFormType$PostFormPostType = {ctor: 'PostFormPostType'};
var _user$project$Model_ModelFormType$PostFormExcerpt = {ctor: 'PostFormExcerpt'};
var _user$project$Model_ModelFormType$PostFormAuthor = {ctor: 'PostFormAuthor'};
var _user$project$Model_ModelFormType$PostFormDisplayName = {ctor: 'PostFormDisplayName'};
var _user$project$Model_ModelFormType$NoSocialFormField = {ctor: 'NoSocialFormField'};
var _user$project$Model_ModelFormType$SocialFormSocialMediaType = {ctor: 'SocialFormSocialMediaType'};
var _user$project$Model_ModelFormType$SocialFormImageCaption = {ctor: 'SocialFormImageCaption'};
var _user$project$Model_ModelFormType$SocialFormUrl = {ctor: 'SocialFormUrl'};
var _user$project$Model_ModelFormType$SocialFormFeaturedImage = {ctor: 'SocialFormFeaturedImage'};
var _user$project$Model_ModelFormType$SocialFormFacebookCode = {ctor: 'SocialFormFacebookCode'};
var _user$project$Model_ModelFormType$SocialFormDraft = {ctor: 'SocialFormDraft'};
var _user$project$Model_ModelFormType$SocialFormTags = {ctor: 'SocialFormTags'};
var _user$project$Model_ModelFormType$SocialFormDescription = {ctor: 'SocialFormDescription'};
var _user$project$Model_ModelFormType$SocialFormDisplayName = {ctor: 'SocialFormDisplayName'};
var _user$project$Model_ModelFormType$NoTagFormField = {ctor: 'NoTagFormField'};
var _user$project$Model_ModelFormType$TagFormDescription = {ctor: 'TagFormDescription'};
var _user$project$Model_ModelFormType$TagFormDisplayName = {ctor: 'TagFormDisplayName'};
var _user$project$Model_ModelFormType$NoUpdateFormField = {ctor: 'NoUpdateFormField'};
var _user$project$Model_ModelFormType$UpdateFormAuthor = {ctor: 'UpdateFormAuthor'};
var _user$project$Model_ModelFormType$UpdateFormExcerpt = {ctor: 'UpdateFormExcerpt'};
var _user$project$Model_ModelFormType$UpdateFormTitle = {ctor: 'UpdateFormTitle'};
var _user$project$Model_ModelFormType$UpdateFormDisplayName = {ctor: 'UpdateFormDisplayName'};

var _user$project$Msg$OnLocationChange = function (a) {
	return {ctor: 'OnLocationChange', _0: a};
};
var _user$project$Msg$SendInitialMessageSuccess = function (a) {
	return {ctor: 'SendInitialMessageSuccess', _0: a};
};
var _user$project$Msg$SendInitialMessage = F3(
	function (a, b, c) {
		return {ctor: 'SendInitialMessage', _0: a, _1: b, _2: c};
	});
var _user$project$Msg$UpdateCurrentTaskDuration = function (a) {
	return {ctor: 'UpdateCurrentTaskDuration', _0: a};
};
var _user$project$Msg$NewTime = function (a) {
	return {ctor: 'NewTime', _0: a};
};
var _user$project$Msg$NewDate = function (a) {
	return {ctor: 'NewDate', _0: a};
};
var _user$project$Msg$Tick = function (a) {
	return {ctor: 'Tick', _0: a};
};
var _user$project$Msg$RandomProductLikeNumber = function (a) {
	return {ctor: 'RandomProductLikeNumber', _0: a};
};
var _user$project$Msg$RandomCtaNumber = function (a) {
	return {ctor: 'RandomCtaNumber', _0: a};
};
var _user$project$Msg$KeyUp = function (a) {
	return {ctor: 'KeyUp', _0: a};
};
var _user$project$Msg$KeyDown = function (a) {
	return {ctor: 'KeyDown', _0: a};
};
var _user$project$Msg$UpdateEnvSuccess = function (a) {
	return {ctor: 'UpdateEnvSuccess', _0: a};
};
var _user$project$Msg$FetchCommonEnvSuccess = function (a) {
	return {ctor: 'FetchCommonEnvSuccess', _0: a};
};
var _user$project$Msg$FetchIndividualEnvSuccess = function (a) {
	return {ctor: 'FetchIndividualEnvSuccess', _0: a};
};
var _user$project$Msg$FetchConfigSuccess = function (a) {
	return {ctor: 'FetchConfigSuccess', _0: a};
};
var _user$project$Msg$UpdateEnv = function (a) {
	return {ctor: 'UpdateEnv', _0: a};
};
var _user$project$Msg$FetchIndividualEnv = function (a) {
	return {ctor: 'FetchIndividualEnv', _0: a};
};
var _user$project$Msg$FetchCommonEnv = {ctor: 'FetchCommonEnv'};
var _user$project$Msg$FetchConfig = function (a) {
	return {ctor: 'FetchConfig', _0: a};
};
var _user$project$Msg$InitialDatePickerDate = function (a) {
	return {ctor: 'InitialDatePickerDate', _0: a};
};
var _user$project$Msg$ToDatePicker = function (a) {
	return {ctor: 'ToDatePicker', _0: a};
};
var _user$project$Msg$SetBuildForm = F2(
	function (a, b) {
		return {ctor: 'SetBuildForm', _0: a, _1: b};
	});
var _user$project$Msg$SetIndividualEnvField = F2(
	function (a, b) {
		return {ctor: 'SetIndividualEnvField', _0: a, _1: b};
	});
var _user$project$Msg$SetCommonEnvField = F2(
	function (a, b) {
		return {ctor: 'SetCommonEnvField', _0: a, _1: b};
	});
var _user$project$Msg$SetConfigFormField = F2(
	function (a, b) {
		return {ctor: 'SetConfigFormField', _0: a, _1: b};
	});
var _user$project$Msg$SetUpdatesField = F2(
	function (a, b) {
		return {ctor: 'SetUpdatesField', _0: a, _1: b};
	});
var _user$project$Msg$SetTagsField = F2(
	function (a, b) {
		return {ctor: 'SetTagsField', _0: a, _1: b};
	});
var _user$project$Msg$SetSocialField = F2(
	function (a, b) {
		return {ctor: 'SetSocialField', _0: a, _1: b};
	});
var _user$project$Msg$SetSocialCheckbox = {ctor: 'SetSocialCheckbox'};
var _user$project$Msg$SetPostsField = F2(
	function (a, b) {
		return {ctor: 'SetPostsField', _0: a, _1: b};
	});
var _user$project$Msg$SetProductsCheckbox = {ctor: 'SetProductsCheckbox'};
var _user$project$Msg$SetProductsField = F2(
	function (a, b) {
		return {ctor: 'SetProductsField', _0: a, _1: b};
	});
var _user$project$Msg$ItemDeleteSuccess = function (a) {
	return {ctor: 'ItemDeleteSuccess', _0: a};
};
var _user$project$Msg$ItemUpdateSuccess = function (a) {
	return {ctor: 'ItemUpdateSuccess', _0: a};
};
var _user$project$Msg$ItemCreateSuccess = function (a) {
	return {ctor: 'ItemCreateSuccess', _0: a};
};
var _user$project$Msg$ItemDelete = F2(
	function (a, b) {
		return {ctor: 'ItemDelete', _0: a, _1: b};
	});
var _user$project$Msg$ItemUpdate = F2(
	function (a, b) {
		return {ctor: 'ItemUpdate', _0: a, _1: b};
	});
var _user$project$Msg$ItemCreate = function (a) {
	return {ctor: 'ItemCreate', _0: a};
};
var _user$project$Msg$PopulateForm = function (a) {
	return {ctor: 'PopulateForm', _0: a};
};
var _user$project$Msg$PopulateIndividual = function (a) {
	return {ctor: 'PopulateIndividual', _0: a};
};
var _user$project$Msg$PrefilNewProductSuccess = function (a) {
	return {ctor: 'PrefilNewProductSuccess', _0: a};
};
var _user$project$Msg$PrefilSocialMediaFormSuccess = function (a) {
	return {ctor: 'PrefilSocialMediaFormSuccess', _0: a};
};
var _user$project$Msg$PrefilSocialMediaForm = function (a) {
	return {ctor: 'PrefilSocialMediaForm', _0: a};
};
var _user$project$Msg$PrefilNewProduct = {ctor: 'PrefilNewProduct'};
var _user$project$Msg$FetchWebsitesIndividualSuccess = function (a) {
	return {ctor: 'FetchWebsitesIndividualSuccess', _0: a};
};
var _user$project$Msg$OnProductFinderInput = function (a) {
	return {ctor: 'OnProductFinderInput', _0: a};
};
var _user$project$Msg$MultiSelectChanged = function (a) {
	return {ctor: 'MultiSelectChanged', _0: a};
};
var _user$project$Msg$OnBlurCheckBuildFormValidation = {ctor: 'OnBlurCheckBuildFormValidation'};
var _user$project$Msg$OnBlurCheckSocialFormValidation = {ctor: 'OnBlurCheckSocialFormValidation'};
var _user$project$Msg$OnBlurCheckTagFormValidation = {ctor: 'OnBlurCheckTagFormValidation'};
var _user$project$Msg$OnBlurCheckUpdateFormValidation = {ctor: 'OnBlurCheckUpdateFormValidation'};
var _user$project$Msg$OnBlurCheckProductFormValidation = {ctor: 'OnBlurCheckProductFormValidation'};
var _user$project$Msg$OnBlurCheckPostFormValidation = {ctor: 'OnBlurCheckPostFormValidation'};
var _user$project$Msg$FetchWebsitesIndexSuccess = function (a) {
	return {ctor: 'FetchWebsitesIndexSuccess', _0: a};
};
var _user$project$Msg$NewWebsiteSuccess = function (a) {
	return {ctor: 'NewWebsiteSuccess', _0: a};
};
var _user$project$Msg$OnNewWebsite = function (a) {
	return {ctor: 'OnNewWebsite', _0: a};
};
var _user$project$Msg$ServerSetupSuccess = function (a) {
	return {ctor: 'ServerSetupSuccess', _0: a};
};
var _user$project$Msg$OnServerSetup = function (a) {
	return {ctor: 'OnServerSetup', _0: a};
};
var _user$project$Msg$AccountSetupSuccess = function (a) {
	return {ctor: 'AccountSetupSuccess', _0: a};
};
var _user$project$Msg$OnAccountSetup = function (a) {
	return {ctor: 'OnAccountSetup', _0: a};
};
var _user$project$Msg$RegisterDomainSuccess = function (a) {
	return {ctor: 'RegisterDomainSuccess', _0: a};
};
var _user$project$Msg$OnRegisterDomain = function (a) {
	return {ctor: 'OnRegisterDomain', _0: a};
};
var _user$project$Msg$CheckDomainSuccess = function (a) {
	return {ctor: 'CheckDomainSuccess', _0: a};
};
var _user$project$Msg$OnCheckDomain = function (a) {
	return {ctor: 'OnCheckDomain', _0: a};
};
var _user$project$Msg$RenewDomainSuccess = function (a) {
	return {ctor: 'RenewDomainSuccess', _0: a};
};
var _user$project$Msg$OnRenewDomain = function (a) {
	return {ctor: 'OnRenewDomain', _0: a};
};
var _user$project$Msg$FetchDomainExpirationDataSuccess = function (a) {
	return {ctor: 'FetchDomainExpirationDataSuccess', _0: a};
};
var _user$project$Msg$FetchDomainExpirationData = {ctor: 'FetchDomainExpirationData'};
var _user$project$Msg$FetchGoogleAnalyticsDataSuccess = function (a) {
	return {ctor: 'FetchGoogleAnalyticsDataSuccess', _0: a};
};
var _user$project$Msg$FetchGoogleAnalyticsData = {ctor: 'FetchGoogleAnalyticsData'};
var _user$project$Msg$CommandSuccess = function (a) {
	return {ctor: 'CommandSuccess', _0: a};
};
var _user$project$Msg$OnCommand = F2(
	function (a, b) {
		return {ctor: 'OnCommand', _0: a, _1: b};
	});
var _user$project$Msg$DevelopmentDropdownChange = function (a) {
	return {ctor: 'DevelopmentDropdownChange', _0: a};
};
var _user$project$Msg$ChangeServerSuccess = function (a) {
	return {ctor: 'ChangeServerSuccess', _0: a};
};
var _user$project$Msg$OnChangeServer = F3(
	function (a, b, c) {
		return {ctor: 'OnChangeServer', _0: a, _1: b, _2: c};
	});
var _user$project$Msg$FetchServerStatusSuccess = function (a) {
	return {ctor: 'FetchServerStatusSuccess', _0: a};
};
var _user$project$Msg$FetchConsoleItemSuccess = function (a) {
	return {ctor: 'FetchConsoleItemSuccess', _0: a};
};
var _user$project$Msg$NewSessionSuccess = function (a) {
	return {ctor: 'NewSessionSuccess', _0: a};
};
var _user$project$Msg$FailResponse = function (a) {
	return {ctor: 'FailResponse', _0: a};
};

var _user$project$Helper_HttpHelper$resultToMsg = F3(
	function (errMsg, okMsg, result) {
		var _p0 = result;
		if (_p0.ctor === 'Ok') {
			return okMsg(_p0._0);
		} else {
			return errMsg(_p0._0);
		}
	});
var _user$project$Helper_HttpHelper$baseRequest = F4(
	function (verb, url, expect, body) {
		return _elm_lang$http$Http$request(
			{
				method: verb,
				headers: {ctor: '[]'},
				url: url,
				expect: expect,
				body: body,
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: true
			});
	});
var _user$project$Helper_HttpHelper$httpGet = F4(
	function (url, decoder, onFail, onSucceed) {
		var request = A4(
			_user$project$Helper_HttpHelper$baseRequest,
			'GET',
			url,
			_elm_lang$http$Http$expectJson(decoder),
			_elm_lang$http$Http$emptyBody);
		return A2(
			_elm_lang$http$Http$send,
			A2(_user$project$Helper_HttpHelper$resultToMsg, onFail, onSucceed),
			request);
	});
var _user$project$Helper_HttpHelper$httpPost = F5(
	function (url, body, decoder, onFail, onSucceed) {
		var request = A4(
			_user$project$Helper_HttpHelper$baseRequest,
			'POST',
			url,
			_elm_lang$http$Http$expectJson(decoder),
			body);
		return A2(
			_elm_lang$http$Http$send,
			A2(_user$project$Helper_HttpHelper$resultToMsg, onFail, onSucceed),
			request);
	});
var _user$project$Helper_HttpHelper$httpPut = F5(
	function (url, body, decoder, onFail, onSucceed) {
		var request = A4(
			_user$project$Helper_HttpHelper$baseRequest,
			'PUT',
			url,
			_elm_lang$http$Http$expectJson(decoder),
			body);
		return A2(
			_elm_lang$http$Http$send,
			A2(_user$project$Helper_HttpHelper$resultToMsg, onFail, onSucceed),
			request);
	});
var _user$project$Helper_HttpHelper$httpDelete = F4(
	function (url, expect, onFail, onSucceed) {
		var request = A4(_user$project$Helper_HttpHelper$baseRequest, 'DELETE', url, expect, _elm_lang$http$Http$emptyBody);
		return A2(
			_elm_lang$http$Http$send,
			A2(_user$project$Helper_HttpHelper$resultToMsg, onFail, onSucceed),
			request);
	});

var _user$project$Command$generateConsoleItem = F4(
	function (currentDate, command, text, consoleItemType) {
		return {inserted_at: currentDate, command: command, console_type: consoleItemType, text: text};
	});
var _user$project$Command$consoleItemTypeToString = function (consoleItemType) {
	var _p0 = consoleItemType;
	switch (_p0.ctor) {
		case 'NewSession':
			return 'new_session';
		case 'Begin':
			return 'begin';
		case 'Toggle':
			return 'toggle';
		case 'Load':
			return 'load';
		case 'NonExistent':
			return 'non_existent';
		case 'Success':
			return 'success';
		default:
			return 'failure';
	}
};
var _user$project$Command$websitesTypeToEncoder = function (websitesDataType) {
	var _p1 = websitesDataType;
	switch (_p1.ctor) {
		case 'ProductDataFormType':
			return _user$project$Model_ModelEncode$productFormDataEncoder(_p1._0);
		case 'PostDataFormType':
			return _user$project$Model_ModelEncode$postFormDataEncoder(_p1._0);
		case 'TagDataFormType':
			return _user$project$Model_ModelEncode$tagFormDataEncoder(_p1._0);
		case 'UpdateDataFormType':
			return _user$project$Model_ModelEncode$updateFormDataEncoder(_p1._0);
		default:
			return _user$project$Model_ModelEncode$socialFormDataEncoder(_p1._0);
	}
};
var _user$project$Command$websitesTypeToString = function (websitesDataType) {
	var _p2 = websitesDataType;
	switch (_p2.ctor) {
		case 'ProductDataFormType':
			return 'products';
		case 'PostDataFormType':
			return 'posts';
		case 'TagDataFormType':
			return 'tags';
		case 'UpdateDataFormType':
			return 'updates';
		default:
			return 'social_media';
	}
};
var _user$project$Command$updateIndividualEnv = F2(
	function (individualEnvData, websitesDropdownSelection) {
		return A5(
			_user$project$Helper_HttpHelper$httpPost,
			A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/env/update_individual_env_data/', websitesDropdownSelection.acronym),
			_elm_lang$http$Http$jsonBody(
				_user$project$Model_ModelEncode$individualEnvDataEncoder(individualEnvData)),
			_user$project$Model_ModelDecode$messageDecoder,
			_user$project$Msg$FailResponse,
			_user$project$Msg$UpdateEnvSuccess);
	});
var _user$project$Command$fetchIndividualEnv = function (acronym) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/env/fetch_individual_env_data/', acronym),
		_user$project$Model_ModelDecode$individualEnvMESSAGEDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$FetchIndividualEnvSuccess);
};
var _user$project$Command$updateCommonEnv = function (commonEnvData) {
	return A5(
		_user$project$Helper_HttpHelper$httpPost,
		'http://localhost:4000/api/env/update_common_env_data/',
		_elm_lang$http$Http$jsonBody(
			_user$project$Model_ModelEncode$commonEnvDataEncoder(commonEnvData)),
		_user$project$Model_ModelDecode$messageDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$UpdateEnvSuccess);
};
var _user$project$Command$fetchCommonEnv = A4(_user$project$Helper_HttpHelper$httpGet, 'http://localhost:4000/api/env/fetch_common_env_data/', _user$project$Model_ModelDecode$commonEnvMESSAGEDecoder, _user$project$Msg$FailResponse, _user$project$Msg$FetchCommonEnvSuccess);
var _user$project$Command$updateConfig = F2(
	function (config, websitesDropdown) {
		return A5(
			_user$project$Helper_HttpHelper$httpPost,
			A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/env/update_config_details/', websitesDropdown.acronym),
			_elm_lang$http$Http$jsonBody(
				_user$project$Model_ModelEncode$configEncoder(config)),
			_user$project$Model_ModelDecode$messageDecoder,
			_user$project$Msg$FailResponse,
			_user$project$Msg$UpdateEnvSuccess);
	});
var _user$project$Command$fetchConfig = function (acronym) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/env/fetch_config_details/', acronym),
		_user$project$Model_ModelDecode$configMESSAGEDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$FetchConfigSuccess);
};
var _user$project$Command$prefilSocialMediaForm = F2(
	function (product, acronym) {
		return A4(
			_user$project$Helper_HttpHelper$httpGet,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'http://localhost:4000/api/websites/prefil_social_media_form/',
				A2(
					_elm_lang$core$Basics_ops['++'],
					product.id,
					A2(_elm_lang$core$Basics_ops['++'], '/', acronym))),
			_user$project$Model_ModelDecode$socialFormMESSAGEDecoder,
			_user$project$Msg$FailResponse,
			_user$project$Msg$PrefilSocialMediaFormSuccess);
	});
var _user$project$Command$itemDelete = F3(
	function (websiteType, acronym, item_id) {
		return A4(
			_user$project$Helper_HttpHelper$httpDelete,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'http://localhost:4000/api/websites/item_delete/',
				A2(
					_elm_lang$core$Basics_ops['++'],
					websiteType,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'/',
						A2(
							_elm_lang$core$Basics_ops['++'],
							acronym,
							A2(_elm_lang$core$Basics_ops['++'], '/', item_id))))),
			_elm_lang$http$Http$expectJson(_user$project$Model_ModelDecode$messageDecoder),
			_user$project$Msg$FailResponse,
			_user$project$Msg$ItemCreateSuccess);
	});
var _user$project$Command$itemUpdate = F3(
	function (websitesDataType, acronym, item_id) {
		return A5(
			_user$project$Helper_HttpHelper$httpPut,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'http://localhost:4000/api/websites/item_update/',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$Command$websitesTypeToString(websitesDataType),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'/',
						A2(
							_elm_lang$core$Basics_ops['++'],
							acronym,
							A2(_elm_lang$core$Basics_ops['++'], '/', item_id))))),
			_elm_lang$http$Http$jsonBody(
				_user$project$Command$websitesTypeToEncoder(websitesDataType)),
			_user$project$Model_ModelDecode$messageDecoder,
			_user$project$Msg$FailResponse,
			_user$project$Msg$ItemUpdateSuccess);
	});
var _user$project$Command$itemCreate = F2(
	function (websitesDataType, acronym) {
		return A5(
			_user$project$Helper_HttpHelper$httpPost,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'http://localhost:4000/api/websites/item_create/',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$Command$websitesTypeToString(websitesDataType),
					A2(_elm_lang$core$Basics_ops['++'], '/', acronym))),
			_elm_lang$http$Http$jsonBody(
				_user$project$Command$websitesTypeToEncoder(websitesDataType)),
			_user$project$Model_ModelDecode$messageDecoder,
			_user$project$Msg$FailResponse,
			_user$project$Msg$ItemCreateSuccess);
	});
var _user$project$Command$prefilNewProduct = function (input) {
	return A5(
		_user$project$Helper_HttpHelper$httpPost,
		'http://localhost:4000/api/websites/search_for_amazon_item',
		_elm_lang$http$Http$jsonBody(
			_user$project$Model_ModelEncode$prefilNewProductEncoder(input)),
		_user$project$Model_ModelDecode$newProductMESSAGEDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$PrefilNewProductSuccess);
};
var _user$project$Command$fetchWebsiteIndividual = function (acronym) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/websites/fetch_website_individual/', acronym),
		_user$project$Model_ModelDecode$websiteIndividualDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$FetchWebsitesIndividualSuccess);
};
var _user$project$Command$newWebsite = function (newWebsite) {
	return A5(
		_user$project$Helper_HttpHelper$httpPost,
		'http://localhost:4000/api/build/new_website',
		_elm_lang$http$Http$jsonBody(
			_user$project$Model_ModelEncode$newWebsiteEncoder(newWebsite)),
		_user$project$Model_ModelDecode$messageDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$NewWebsiteSuccess);
};
var _user$project$Command$serverSetup = function (domain) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/build/setup_server/', domain),
		_user$project$Model_ModelDecode$messageDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$ServerSetupSuccess);
};
var _user$project$Command$accountSetup = function (domain) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/build/setup_google/', domain),
		_user$project$Model_ModelDecode$messageDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$AccountSetupSuccess);
};
var _user$project$Command$registerDomain = function (domain) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/build/register_domain/', domain),
		_user$project$Model_ModelDecode$messageDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$RegisterDomainSuccess);
};
var _user$project$Command$checkDomain = function (domain) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/build/check_domain/', domain),
		_user$project$Model_ModelDecode$messageDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$CheckDomainSuccess);
};
var _user$project$Command$renewDomain = function (domain) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/overview/renew_domain/', domain),
		_user$project$Model_ModelDecode$messageDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$RenewDomainSuccess);
};
var _user$project$Command$fetchDomainExpirationData = A4(_user$project$Helper_HttpHelper$httpGet, 'http://localhost:4000/api/overview/fetch_domain_expiration_data', _user$project$Model_ModelDecode$domainExpirationMESSAGEDecoder, _user$project$Msg$FailResponse, _user$project$Msg$FetchDomainExpirationDataSuccess);
var _user$project$Command$fetchGoogleAnalyticsData = A4(_user$project$Helper_HttpHelper$httpGet, 'http://localhost:4000/api/overview/fetch_google_analytics_data', _user$project$Model_ModelDecode$googleAnalyticsMESSAGEDecoder, _user$project$Msg$FailResponse, _user$project$Msg$FetchGoogleAnalyticsDataSuccess);
var _user$project$Command$fetchWebsitesIndex = A4(_user$project$Helper_HttpHelper$httpGet, 'http://localhost:4000/api/overview/fetch_websites_index', _user$project$Model_ModelDecode$websitesItemMESSAGEDecoder, _user$project$Msg$FailResponse, _user$project$Msg$FetchWebsitesIndexSuccess);
var _user$project$Command$sendInitialMessage = F3(
	function (command, text, consoleItemType) {
		return A4(
			_user$project$Helper_HttpHelper$httpGet,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'http://localhost:4000/api/application/send_initial_console_item/',
				A2(
					_elm_lang$core$Basics_ops['++'],
					command,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'/',
						A2(
							_elm_lang$core$Basics_ops['++'],
							text,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'/',
								_user$project$Command$consoleItemTypeToString(consoleItemType)))))),
			_user$project$Model_ModelDecode$messageDecoder,
			_user$project$Msg$FailResponse,
			_user$project$Msg$SendInitialMessageSuccess);
	});
var _user$project$Command$command = F3(
	function (script, devOrProd, acronym) {
		return A4(
			_user$project$Helper_HttpHelper$httpGet,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'http://localhost:4000/api/application/command/',
				A2(
					_elm_lang$core$Basics_ops['++'],
					script,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'/',
						A2(
							_elm_lang$core$Basics_ops['++'],
							devOrProd,
							A2(_elm_lang$core$Basics_ops['++'], '/', acronym))))),
			_user$project$Model_ModelDecode$messageDecoder,
			_user$project$Msg$FailResponse,
			_user$project$Msg$CommandSuccess);
	});
var _user$project$Command$fetchServerStatus = function (devOrProd) {
	return A4(
		_user$project$Helper_HttpHelper$httpGet,
		A2(_elm_lang$core$Basics_ops['++'], 'http://localhost:4000/api/application/fetch_server_status/', devOrProd),
		_user$project$Model_ModelDecode$serverStatusMESSAGEDecoder,
		_user$project$Msg$FailResponse,
		_user$project$Msg$FetchServerStatusSuccess);
};
var _user$project$Command$fetchConsoleItemList = A4(_user$project$Helper_HttpHelper$httpGet, 'http://localhost:4000/api/application/fetch_console_item_list', _user$project$Model_ModelDecode$messageListDecoder, _user$project$Msg$FailResponse, _user$project$Msg$FetchConsoleItemSuccess);
var _user$project$Command$newConsoleSession = A4(_user$project$Helper_HttpHelper$httpGet, 'http://localhost:4000/api/application/new_console_session', _user$project$Model_ModelDecode$messageDecoder, _user$project$Msg$FailResponse, _user$project$Msg$NewSessionSuccess);

var _user$project$Model_ModelRouting$NotFoundRoute = {ctor: 'NotFoundRoute'};
var _user$project$Model_ModelRouting$WebsiteNestedRouteShowEdit = F4(
	function (a, b, c, d) {
		return {ctor: 'WebsiteNestedRouteShowEdit', _0: a, _1: b, _2: c, _3: d};
	});
var _user$project$Model_ModelRouting$WebsiteNestedRoute = F3(
	function (a, b, c) {
		return {ctor: 'WebsiteNestedRoute', _0: a, _1: b, _2: c};
	});
var _user$project$Model_ModelRouting$WebsiteRoute = function (a) {
	return {ctor: 'WebsiteRoute', _0: a};
};
var _user$project$Model_ModelRouting$ConfigRoute = {ctor: 'ConfigRoute'};
var _user$project$Model_ModelRouting$DevelopmentRoute = {ctor: 'DevelopmentRoute'};
var _user$project$Model_ModelRouting$BuildRoute = {ctor: 'BuildRoute'};
var _user$project$Model_ModelRouting$OverviewRoute = {ctor: 'OverviewRoute'};
var _user$project$Model_ModelRouting$IndexRoute = {ctor: 'IndexRoute'};

var _user$project$Model_ModelNavbar$NavbarItem = F3(
	function (a, b, c) {
		return {main: a, route: b, sub: c};
	});
var _user$project$Model_ModelNavbar$NavbarSubItem = F2(
	function (a, b) {
		return {name: a, acronym: b};
	});
var _user$project$Model_ModelNavbar$WebsitesNavbarItem = F4(
	function (a, b, c, d) {
		return {main: a, url: b, acronym: c, sub: d};
	});
var _user$project$Model_ModelNavbar$WebsitesNavbarSubItem = F2(
	function (a, b) {
		return {name: a, action: b};
	});

var _user$project$Model_ModelValidation$ValidationAlias = F3(
	function (a, b, c) {
		return {isEmpty: a, validationMessage: b, validationType: c};
	});
var _user$project$Model_ModelValidation$ProductFormValidation = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {display_name: a, description: b, blog_description: c, featured_image: d, cta: e, price: f, url: g, url_text: h, tag_id: i, product_like: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelValidation$PostFormValidation = F4(
	function (a, b, c, d) {
		return {display_name: a, author: b, excerpt: c, featured_image: d};
	});
var _user$project$Model_ModelValidation$TagFormValidation = F2(
	function (a, b) {
		return {display_name: a, description: b};
	});
var _user$project$Model_ModelValidation$SocialFormValidation = F6(
	function (a, b, c, d, e, f) {
		return {display_name: a, description: b, tags: c, featured_image: d, url: e, image_caption: f};
	});
var _user$project$Model_ModelValidation$UpdateFormValidation = F4(
	function (a, b, c, d) {
		return {display_name: a, title: b, excerpt: c, author: d};
	});
var _user$project$Model_ModelValidation$BuildFormValidation = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return function (s) {
																			return function (t) {
																				return function (u) {
																					return function (v) {
																						return function (w) {
																							return function (x) {
																								return function (y) {
																									return function (z) {
																										return function (_1) {
																											return function (_2) {
																												return function (_3) {
																													return function (_4) {
																														return function (_5) {
																															return function (_6) {
																																return {website_acronym: a, website_lower: b, website_capital: c, num_of_categories: d, c1_name: e, c1_display_name: f, c1_model: g, c1_icon: h, c2_name: i, c2_display_name: j, c2_model: k, c2_icon: l, c3_name: m, c3_display_name: n, c3_model: o, c3_icon: p, c4_name: q, c4_display_name: r, c4_model: s, c4_icon: t, c5_name: u, c5_display_name: v, c5_model: w, c5_icon: x, c6_name: y, c6_display_name: z, c6_model: _1, c6_icon: _2, c7_name: _3, c7_display_name: _4, c7_model: _5, c7_icon: _6};
																															};
																														};
																													};
																												};
																											};
																										};
																									};
																								};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Model_ModelValidation$NoValidation = {ctor: 'NoValidation'};
var _user$project$Model_ModelValidation$TagIdValidation = {ctor: 'TagIdValidation'};
var _user$project$Model_ModelValidation$FloatValidation = {ctor: 'FloatValidation'};
var _user$project$Model_ModelValidation$BoolValidation = {ctor: 'BoolValidation'};
var _user$project$Model_ModelValidation$IntValidation = {ctor: 'IntValidation'};
var _user$project$Model_ModelValidation$StringValidation = {ctor: 'StringValidation'};

var _user$project$Model_ModelSocial$SocialMediaTypeDropdown = F2(
	function (a, b) {
		return {socialMediaType: a, name: b};
	});
var _user$project$Model_ModelSocial$Tumblr = {ctor: 'Tumblr'};
var _user$project$Model_ModelSocial$Pinterest = {ctor: 'Pinterest'};
var _user$project$Model_ModelSocial$Facebook = {ctor: 'Facebook'};
var _user$project$Model_ModelSocial$Twitter = {ctor: 'Twitter'};

var _user$project$Model_ModelPosts$PostTypeDropdown = F2(
	function (a, b) {
		return {postType: a, name: b};
	});
var _user$project$Model_ModelPosts$ProductList = {ctor: 'ProductList'};
var _user$project$Model_ModelPosts$Generic = {ctor: 'Generic'};

var _user$project$Model_ModelProducts$ProductTypeDropdown = F2(
	function (a, b) {
		return {productType: a, name: b};
	});
var _user$project$Model_ModelProducts$Submission = {ctor: 'Submission'};
var _user$project$Model_ModelProducts$Featured = {ctor: 'Featured'};
var _user$project$Model_ModelProducts$General = {ctor: 'General'};

var _user$project$Component_MultiSelect$defaultOptions = function (onChange) {
	return {
		items: {ctor: '[]'},
		onChange: onChange
	};
};
var _user$project$Component_MultiSelect$Item = F3(
	function (a, b, c) {
		return {value: a, text: b, enabled: c};
	});
var _user$project$Component_MultiSelect$Options = F2(
	function (a, b) {
		return {items: a, onChange: b};
	});
var _user$project$Component_MultiSelect$Option = F3(
	function (a, b, c) {
		return {value: a, text: b, selected: c};
	});
var _user$project$Component_MultiSelect$optionDecoder = A4(
	_elm_lang$core$Json_Decode$map3,
	_user$project$Component_MultiSelect$Option,
	A2(_elm_lang$core$Json_Decode$field, 'value', _elm_lang$core$Json_Decode$string),
	A2(_elm_lang$core$Json_Decode$field, 'text', _elm_lang$core$Json_Decode$string),
	A2(_elm_lang$core$Json_Decode$field, 'selected', _elm_lang$core$Json_Decode$bool));
var _user$project$Component_MultiSelect$optionsDecoder = function () {
	var loop = F2(
		function (idx, xs) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				function (_p0) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Json_Decode$succeed(xs),
						A2(
							_elm_lang$core$Maybe$map,
							function (x) {
								return A2(
									loop,
									idx + 1,
									{ctor: '::', _0: x, _1: xs});
							},
							_p0));
				},
				_elm_lang$core$Json_Decode$maybe(
					A2(
						_elm_lang$core$Json_Decode$field,
						_elm_lang$core$Basics$toString(idx),
						_user$project$Component_MultiSelect$optionDecoder)));
		});
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$List$reverse,
		A2(
			_elm_lang$core$Json_Decode$field,
			'options',
			A2(
				loop,
				0,
				{ctor: '[]'})));
}();
var _user$project$Component_MultiSelect$selectedOptionsDecoder = function () {
	var filterSelected = function (options) {
		return A2(
			_elm_lang$core$List$map,
			function (_) {
				return _.value;
			},
			A2(
				_elm_lang$core$List$filter,
				function (_) {
					return _.selected;
				},
				options));
	};
	return A2(
		_elm_lang$core$Json_Decode$map,
		filterSelected,
		A2(_elm_lang$core$Json_Decode$field, 'target', _user$project$Component_MultiSelect$optionsDecoder));
}();
var _user$project$Component_MultiSelect$onChange = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _user$project$Component_MultiSelect$selectedOptionsDecoder));
};
var _user$project$Component_MultiSelect$multiSelect = F3(
	function (options, attributes, currentValue) {
		var isSelected = function (value) {
			return A2(
				_elm_lang$core$List$any,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(value),
				currentValue);
		};
		var toOption = function (_p1) {
			var _p2 = _p1;
			var _p3 = _p2.value;
			return A2(
				_elm_lang$html$Html$option,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$value(_p3),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$selected(
							isSelected(_p3)),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$disabled(!_p2.enabled),
							_1: {ctor: '[]'}
						}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_p2.text),
					_1: {ctor: '[]'}
				});
		};
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('select is-multiple'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$select,
					A2(
						_elm_lang$core$Basics_ops['++'],
						attributes,
						{
							ctor: '::',
							_0: _user$project$Component_MultiSelect$onChange(options.onChange),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$multiple(true),
								_1: {ctor: '[]'}
							}
						}),
					A2(_elm_lang$core$List$map, toOption, options.items)),
				_1: {ctor: '[]'}
			});
	});

var _user$project$Model$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return function (s) {
																			return function (t) {
																				return function (u) {
																					return function (v) {
																						return function (w) {
																							return function (x) {
																								return function (y) {
																									return function (z) {
																										return function (_1) {
																											return function (_2) {
																												return function (_3) {
																													return function (_4) {
																														return function (_5) {
																															return function (_6) {
																																return function (_7) {
																																	return function (_8) {
																																		return function (_9) {
																																			return function (_10) {
																																				return function (_11) {
																																					return function (_12) {
																																						return function (_13) {
																																							return function (_14) {
																																								return function (_15) {
																																									return function (_16) {
																																										return function (_17) {
																																											return function (_18) {
																																												return function (_19) {
																																													return function (_20) {
																																														return function (_21) {
																																															return function (_22) {
																																																return function (_23) {
																																																	return function (_24) {
																																																		return function (_25) {
																																																			return function (_26) {
																																																				return function (_27) {
																																																					return function (_28) {
																																																						return function (_29) {
																																																							return function (_30) {
																																																								return function (_31) {
																																																									return function (_32) {
																																																										return function (_33) {
																																																											return function (_34) {
																																																												return function (_35) {
																																																													return function (_36) {
																																																														return function (_37) {
																																																															return function (_38) {
																																																																return function (_39) {
																																																																	return function (_40) {
																																																																		return function (_41) {
																																																																			return function (_42) {
																																																																				return function (_43) {
																																																																					return function (_44) {
																																																																						return function (_45) {
																																																																							return function (_46) {
																																																																								return function (_47) {
																																																																									return {websitesItemList: a, navbarWebsiteItems: b, websitesMainNavbarItems: c, navbarStatus: d, consoleItemList: e, keysDown: f, googleAnalyticsData: g, domainExpirationData: h, productionServerStatusList: i, developmentServerStatusList: j, commandsList: k, developmentDropdown: l, developmentDropdownSelection: m, domainInput: n, buildForm: o, productFinderInput: p, productFinderData: q, randomCtaNumber: r, randomProductLikeNumber: s, productTagId: t, postTagId: u, multiSelectTagIdList: v, multiSelectTagIdSelected: w, productFormDisplayNameCount: x, productFormDescriptionCount: y, productFormBlogDescriptionCount: z, updateNameCount: _1, productForm: _2, postForm: _3, socialForm: _4, tagForm: _5, updateForm: _6, productFormValidation: _7, postFormValidation: _8, socialFormValidation: _9, tagFormValidation: _10, updateFormValidation: _11, buildFormValidation: _12, individualProduct: _13, individualPost: _14, individualSocial: _15, individualTag: _16, individualUpdate: _17, productAssocList: _18, postList: _19, socialList: _20, updateList: _21, tagAssocList: _22, categoryList: _23, productsPendingList: _24, productTypeDropdownList: _25, postTypeDropdownList: _26, socialMediaTypeDropdownList: _27, configDropdown: _28, configDropdownSelection: _29, individualEnvDropdown: _30, individualEnvDropdownSelection: _31, configEnvData: _32, commonEnvData: _33, individualEnvData: _34, route: _35, routeAcronym: _36, routeType: _37, routeAction: _38, routeId: _39, showKeyboardHelper: _40, keyboardAvailable: _41, currentDate: _42, currentTime: _43, currentTasks: _44, date: _45, datePicker: _46, error: _47};
																																																																								};
																																																																							};
																																																																						};
																																																																					};
																																																																				};
																																																																			};
																																																																		};
																																																																	};
																																																																};
																																																															};
																																																														};
																																																													};
																																																												};
																																																											};
																																																										};
																																																									};
																																																								};
																																																							};
																																																						};
																																																					};
																																																				};
																																																			};
																																																		};
																																																	};
																																																};
																																															};
																																														};
																																													};
																																												};
																																											};
																																										};
																																									};
																																								};
																																							};
																																						};
																																					};
																																				};
																																			};
																																		};
																																	};
																																};
																															};
																														};
																													};
																												};
																											};
																										};
																									};
																								};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};

var _user$project$Helper_ViewHelper$convertConsoleItemType = function (consoleItemType) {
	var _p0 = consoleItemType;
	switch (_p0.ctor) {
		case 'NewSession':
			return 'purple';
		case 'Begin':
			return 'orange';
		case 'Toggle':
			return 'blue';
		case 'Load':
			return 'darkgrey';
		case 'NonExistent':
			return 'grey';
		case 'Success':
			return 'green';
		default:
			return 'red';
	}
};
var _user$project$Helper_ViewHelper$convertServerStatus = function (serverStatus) {
	var _p1 = serverStatus;
	if (_p1 === false) {
		return 'red';
	} else {
		return 'green';
	}
};
var _user$project$Helper_ViewHelper$scheduleDateToString = function (schedule_date) {
	var date_year = _elm_lang$core$Basics$toString(schedule_date.year);
	var date_month = _elm_lang$core$Basics$toString(schedule_date.month);
	var date_day = _elm_lang$core$Basics$toString(schedule_date.day);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		date_year,
		A2(
			_elm_lang$core$Basics_ops['++'],
			'-',
			A2(
				_elm_lang$core$Basics_ops['++'],
				date_month,
				A2(_elm_lang$core$Basics_ops['++'], '-', date_day))));
};

var _user$project$Component_ConsoleComponent$consoleItem = function (console) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('console__item'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$span,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$style(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'min-width', _1: '120px'},
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						A2(_elm_lang$core$Basics_ops['++'], console.inserted_at, ' ')),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$span,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$style(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'color',
									_1: _user$project$Helper_ViewHelper$convertConsoleItemType(console.console_type)
								},
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(console.command),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_ConsoleComponent$consoleKeys = function (keyCode) {
	return A2(
		_elm_lang$html$Html$span,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(
				_elm_lang$core$Basics$toString(
					_elm_lang$core$Char$fromCode(keyCode))),
			_1: {ctor: '[]'}
		});
};
var _user$project$Component_ConsoleComponent$currentTasks = function (currentTask) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('current__task'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$p,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(currentTask.name),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$p,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(currentTask.duration)),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_ConsoleComponent$maybeCurrentTasks = function (currentTaskList) {
	var _p0 = currentTaskList;
	if (_p0.ctor === 'Just') {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			A2(_elm_lang$core$List$map, _user$project$Component_ConsoleComponent$currentTasks, _p0._0));
	} else {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('No current tasks.'),
				_1: {ctor: '[]'}
			});
	}
};
var _user$project$Component_ConsoleComponent$consoleComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('console__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('console__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('console__h2'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Console'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _user$project$Component_ConsoleComponent$maybeCurrentTasks(model.currentTasks),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{ctor: '[]'},
								A2(_elm_lang$core$List$map, _user$project$Component_ConsoleComponent$consoleKeys, model.keysDown)),
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('console__bottom'),
						_1: {ctor: '[]'}
					},
					A2(_elm_lang$core$List$map, _user$project$Component_ConsoleComponent$consoleItem, model.consoleItemList)),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_KeyboardHelperComponent$keyboardHelperComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('keyboard__helper'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('columns content'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('column'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$h4,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('Change Dropdown - 1'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$h4,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Clear Form/Fetch Server - 0'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$h4,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Command Helper - 9'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$h4,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('Clear Keyboard - ESC'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$h4,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('Terminate Command - ;'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$h4,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('Submit Form - \\'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$ul,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$li,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('p - product form'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$li,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('b - post form'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$li,
																		{ctor: '[]'},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('s - social form'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$li,
																			{ctor: '[]'},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('t - tag form'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$li,
																				{ctor: '[]'},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('u - update form'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$li,
																					{ctor: '[]'},
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('k - product search'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$li,
																						{ctor: '[]'},
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('c - common env'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$li,
																							{ctor: '[]'},
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('i - individual env'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$li,
																								{ctor: '[]'},
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('e - config env'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {ctor: '[]'}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$h4,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Dev Prod - 2 3'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$ul,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$li,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('dr - dur_all'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$li,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('dc - durc_all'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$li,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('ca - compile_all'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$li,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('cs - compile_single'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$li,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('da - delete_all'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$li,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('ds - delete_single'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$li,
																		{ctor: '[]'},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('ea - ecto_create_all'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$li,
																			{ctor: '[]'},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('em - ecto_migrate_all'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$li,
																				{ctor: '[]'},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('er - ecto_reset_all'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$li,
																					{ctor: '[]'},
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('ua - update_all'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$li,
																						{ctor: '[]'},
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('us - update_single'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$li,
																							{ctor: '[]'},
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('pl - pull_all'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$li,
																								{ctor: '[]'},
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('ps - pull_single'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_elm_lang$html$Html$li,
																									{ctor: '[]'},
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('pa - push_all'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_elm_lang$html$Html$li,
																										{ctor: '[]'},
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('pi - push_single'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$html$Html$li,
																											{ctor: '[]'},
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('pm - push_awful_manager'),
																												_1: {ctor: '[]'}
																											}),
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('column'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$h4,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text(''),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$ul,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$li,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('ti - transfer_images'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$li,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('bs - build_single'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$li,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('sa - seed_all'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$li,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('si - seed_single'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$li,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('ss - start_single'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$li,
																		{ctor: '[]'},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('sl - start_all'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$li,
																			{ctor: '[]'},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('sg - stop_single'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$li,
																				{ctor: '[]'},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('sp - stop_all'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$li,
																					{ctor: '[]'},
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('oa - source_all'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$li,
																						{ctor: '[]'},
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('oi - source_single'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$li,
																							{ctor: '[]'},
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('rs - restart_single'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('column'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$h4,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('UX - 4'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$ul,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$li,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('o - overview'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$li,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('d - development'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$li,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('w - websites'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$li,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('b - build'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$li,
																		{ctor: '[]'},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('c - config'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$li,
																			{ctor: '[]'},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('pi - products/index'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$li,
																				{ctor: '[]'},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('pn -  products/new'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$li,
																					{ctor: '[]'},
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('bi - posts/index'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$li,
																						{ctor: '[]'},
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('bn - posts/new'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$li,
																							{ctor: '[]'},
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('si - social/index'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$li,
																								{ctor: '[]'},
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('sn - social/new'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_elm_lang$html$Html$li,
																									{ctor: '[]'},
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('ti - tags/index'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_elm_lang$html$Html$li,
																										{ctor: '[]'},
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('tn - tags/new'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$html$Html$li,
																											{ctor: '[]'},
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('ui - updates/index'),
																												_1: {ctor: '[]'}
																											}),
																										_1: {
																											ctor: '::',
																											_0: A2(
																												_elm_lang$html$Html$li,
																												{ctor: '[]'},
																												{
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('un - updates/new'),
																													_1: {ctor: '[]'}
																												}),
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {ctor: '[]'}
		});
};

var _user$project$Helper_FormHelper$showValidation = function (validationAlias) {
	var _p0 = validationAlias.isEmpty;
	if (_p0 === true) {
		return A2(
			_elm_lang$html$Html$p,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('help is-danger'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(validationAlias.validationMessage),
				_1: {ctor: '[]'}
			});
	} else {
		return A2(
			_elm_lang$html$Html$p,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('help is-success'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('thank you!'),
				_1: {ctor: '[]'}
			});
	}
};
var _user$project$Helper_FormHelper$convertFormType = function (formType) {
	var _p1 = formType;
	switch (_p1.ctor) {
		case 'Input':
			return {field: 'field', input: 'input', component: _elm_lang$html$Html$input};
		case 'Number':
			return {field: 'field', input: 'input', component: _elm_lang$html$Html$input};
		default:
			return {field: 'field field-description', input: 'textarea', component: _elm_lang$html$Html$textarea};
	}
};
var _user$project$Helper_FormHelper$showListItem = F2(
	function (title, value) {
		return A2(
			_elm_lang$html$Html$li,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$h3,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(title),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$p,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(value),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Helper_FormHelper$mainComponentShow = function (value) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(value),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
};
var _user$project$Helper_FormHelper$noValidation = {isEmpty: false, validationMessage: '', validationType: _user$project$Model_ModelValidation$NoValidation};
var _user$project$Helper_FormHelper$FormRecord = F3(
	function (a, b, c) {
		return {field: a, input: b, component: c};
	});
var _user$project$Helper_FormHelper$Number = {ctor: 'Number'};
var _user$project$Helper_FormHelper$TextArea = {ctor: 'TextArea'};
var _user$project$Helper_FormHelper$Input = {ctor: 'Input'};

var _user$project$Component_Main_BuildComponent$buildFormField = F5(
	function (form_type, label_text, field_value, validation_value, build_form) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								form_class.component,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(form_class.input),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(
											_user$project$Msg$SetBuildForm(build_form)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onBlur(_user$project$Msg$OnBlurCheckBuildFormValidation),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$value(field_value),
												_1: {ctor: '[]'}
											}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _user$project$Helper_FormHelper$showValidation(
							A2(_elm_lang$core$Maybe$withDefault, _user$project$Helper_FormHelper$noValidation, validation_value)),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$Component_Main_BuildComponent$newWebsiteComponent = F2(
	function (build, validation) {
		return A2(
			_elm_lang$html$Html$form,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('build__container'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('columns'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$h2,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('New Website'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A5(
										_user$project$Component_Main_BuildComponent$buildFormField,
										_user$project$Helper_FormHelper$Input,
										'website_acronym',
										build.website_acronym,
										_elm_lang$core$Maybe$Just(validation.website_acronym),
										_user$project$Model_ModelFormType$WebsiteAcronym),
									_1: {
										ctor: '::',
										_0: A5(
											_user$project$Component_Main_BuildComponent$buildFormField,
											_user$project$Helper_FormHelper$Input,
											'website_lower',
											build.website_lower,
											_elm_lang$core$Maybe$Just(validation.website_lower),
											_user$project$Model_ModelFormType$WebsiteLower),
										_1: {
											ctor: '::',
											_0: A5(
												_user$project$Component_Main_BuildComponent$buildFormField,
												_user$project$Helper_FormHelper$Input,
												'website_capital',
												build.website_capital,
												_elm_lang$core$Maybe$Just(validation.website_capital),
												_user$project$Model_ModelFormType$WebsiteCapital),
											_1: {
												ctor: '::',
												_0: A5(
													_user$project$Component_Main_BuildComponent$buildFormField,
													_user$project$Helper_FormHelper$Input,
													'num_of_categories',
													build.num_of_categories,
													_elm_lang$core$Maybe$Just(validation.num_of_categories),
													_user$project$Model_ModelFormType$NumOfCategories),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$h2,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Category Two'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A5(
															_user$project$Component_Main_BuildComponent$buildFormField,
															_user$project$Helper_FormHelper$Input,
															'c2_name',
															build.c2_name,
															_elm_lang$core$Maybe$Just(validation.c2_name),
															_user$project$Model_ModelFormType$C4Name),
														_1: {
															ctor: '::',
															_0: A5(
																_user$project$Component_Main_BuildComponent$buildFormField,
																_user$project$Helper_FormHelper$Input,
																'c2_display_name',
																build.c2_display_name,
																_elm_lang$core$Maybe$Just(validation.c2_display_name),
																_user$project$Model_ModelFormType$C4DisplayName),
															_1: {
																ctor: '::',
																_0: A5(
																	_user$project$Component_Main_BuildComponent$buildFormField,
																	_user$project$Helper_FormHelper$Input,
																	'c2_model',
																	build.c2_model,
																	_elm_lang$core$Maybe$Just(validation.c2_model),
																	_user$project$Model_ModelFormType$C4Model),
																_1: {
																	ctor: '::',
																	_0: A5(
																		_user$project$Component_Main_BuildComponent$buildFormField,
																		_user$project$Helper_FormHelper$Input,
																		'c2_icon',
																		build.c2_icon,
																		_elm_lang$core$Maybe$Just(validation.c2_icon),
																		_user$project$Model_ModelFormType$C4Icon),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$h2,
																			{ctor: '[]'},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('Category Four'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A5(
																				_user$project$Component_Main_BuildComponent$buildFormField,
																				_user$project$Helper_FormHelper$Input,
																				'c4_name',
																				build.c4_name,
																				_elm_lang$core$Maybe$Just(validation.c4_name),
																				_user$project$Model_ModelFormType$C1Name),
																			_1: {
																				ctor: '::',
																				_0: A5(
																					_user$project$Component_Main_BuildComponent$buildFormField,
																					_user$project$Helper_FormHelper$Input,
																					'c4_display_name',
																					build.c4_display_name,
																					_elm_lang$core$Maybe$Just(validation.c4_display_name),
																					_user$project$Model_ModelFormType$C1DisplayName),
																				_1: {
																					ctor: '::',
																					_0: A5(
																						_user$project$Component_Main_BuildComponent$buildFormField,
																						_user$project$Helper_FormHelper$Input,
																						'c4_model',
																						build.c4_model,
																						_elm_lang$core$Maybe$Just(validation.c4_model),
																						_user$project$Model_ModelFormType$C1Model),
																					_1: {
																						ctor: '::',
																						_0: A5(
																							_user$project$Component_Main_BuildComponent$buildFormField,
																							_user$project$Helper_FormHelper$Input,
																							'c4_icon',
																							build.c4_icon,
																							_elm_lang$core$Maybe$Just(validation.c4_icon),
																							_user$project$Model_ModelFormType$C1Icon),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$h2,
																								{ctor: '[]'},
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('Category Six'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A5(
																									_user$project$Component_Main_BuildComponent$buildFormField,
																									_user$project$Helper_FormHelper$Input,
																									'c6_name',
																									build.c6_name,
																									_elm_lang$core$Maybe$Just(validation.c6_name),
																									_user$project$Model_ModelFormType$C5Name),
																								_1: {
																									ctor: '::',
																									_0: A5(
																										_user$project$Component_Main_BuildComponent$buildFormField,
																										_user$project$Helper_FormHelper$Input,
																										'c6_display_name',
																										build.c6_display_name,
																										_elm_lang$core$Maybe$Just(validation.c6_display_name),
																										_user$project$Model_ModelFormType$C5DisplayName),
																									_1: {
																										ctor: '::',
																										_0: A5(
																											_user$project$Component_Main_BuildComponent$buildFormField,
																											_user$project$Helper_FormHelper$Input,
																											'c6_model',
																											build.c6_model,
																											_elm_lang$core$Maybe$Just(validation.c6_model),
																											_user$project$Model_ModelFormType$C5Model),
																										_1: {
																											ctor: '::',
																											_0: A5(
																												_user$project$Component_Main_BuildComponent$buildFormField,
																												_user$project$Helper_FormHelper$Input,
																												'c6_icon',
																												build.c6_icon,
																												_elm_lang$core$Maybe$Just(validation.c6_icon),
																												_user$project$Model_ModelFormType$C5Icon),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_elm_lang$html$Html$fieldset,
																													{
																														ctor: '::',
																														_0: _elm_lang$html$Html_Attributes$class('field'),
																														_1: {ctor: '[]'}
																													},
																													{
																														ctor: '::',
																														_0: A2(
																															_elm_lang$html$Html$label,
																															{
																																ctor: '::',
																																_0: _elm_lang$html$Html_Attributes$class('label'),
																																_1: {ctor: '[]'}
																															},
																															{ctor: '[]'}),
																														_1: {
																															ctor: '::',
																															_0: A2(
																																_elm_lang$html$Html$button,
																																{
																																	ctor: '::',
																																	_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
																																	_1: {
																																		ctor: '::',
																																		_0: _elm_lang$html$Html_Attributes$type_('submit'),
																																		_1: {ctor: '[]'}
																																	}
																																},
																																{
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('Build!'),
																																	_1: {ctor: '[]'}
																																}),
																															_1: {ctor: '[]'}
																														}
																													}),
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('column'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$h2,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Category One'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A5(
											_user$project$Component_Main_BuildComponent$buildFormField,
											_user$project$Helper_FormHelper$Input,
											'c1_name',
											build.c1_name,
											_elm_lang$core$Maybe$Just(validation.c1_name),
											_user$project$Model_ModelFormType$C2Name),
										_1: {
											ctor: '::',
											_0: A5(
												_user$project$Component_Main_BuildComponent$buildFormField,
												_user$project$Helper_FormHelper$Input,
												'c1_display_name',
												build.c1_display_name,
												_elm_lang$core$Maybe$Just(validation.c1_display_name),
												_user$project$Model_ModelFormType$C2DisplayName),
											_1: {
												ctor: '::',
												_0: A5(
													_user$project$Component_Main_BuildComponent$buildFormField,
													_user$project$Helper_FormHelper$Input,
													'c1_model',
													build.c1_model,
													_elm_lang$core$Maybe$Just(validation.c1_model),
													_user$project$Model_ModelFormType$C2Model),
												_1: {
													ctor: '::',
													_0: A5(
														_user$project$Component_Main_BuildComponent$buildFormField,
														_user$project$Helper_FormHelper$Input,
														'c1_icon',
														build.c1_icon,
														_elm_lang$core$Maybe$Just(validation.c1_icon),
														_user$project$Model_ModelFormType$C2Icon),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$h2,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('Category Three'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A5(
																_user$project$Component_Main_BuildComponent$buildFormField,
																_user$project$Helper_FormHelper$Input,
																'c3_name',
																build.c3_name,
																_elm_lang$core$Maybe$Just(validation.c3_name),
																_user$project$Model_ModelFormType$C6Name),
															_1: {
																ctor: '::',
																_0: A5(
																	_user$project$Component_Main_BuildComponent$buildFormField,
																	_user$project$Helper_FormHelper$Input,
																	'c3_display_name',
																	build.c3_display_name,
																	_elm_lang$core$Maybe$Just(validation.c3_display_name),
																	_user$project$Model_ModelFormType$C6DisplayName),
																_1: {
																	ctor: '::',
																	_0: A5(
																		_user$project$Component_Main_BuildComponent$buildFormField,
																		_user$project$Helper_FormHelper$Input,
																		'c3_model',
																		build.c3_model,
																		_elm_lang$core$Maybe$Just(validation.c3_model),
																		_user$project$Model_ModelFormType$C6Model),
																	_1: {
																		ctor: '::',
																		_0: A5(
																			_user$project$Component_Main_BuildComponent$buildFormField,
																			_user$project$Helper_FormHelper$Input,
																			'c3_icon',
																			build.c3_icon,
																			_elm_lang$core$Maybe$Just(validation.c3_icon),
																			_user$project$Model_ModelFormType$C6Icon),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$h2,
																				{ctor: '[]'},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('Category Five'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A5(
																					_user$project$Component_Main_BuildComponent$buildFormField,
																					_user$project$Helper_FormHelper$Input,
																					'c5_name',
																					build.c5_name,
																					_elm_lang$core$Maybe$Just(validation.c5_name),
																					_user$project$Model_ModelFormType$C3Name),
																				_1: {
																					ctor: '::',
																					_0: A5(
																						_user$project$Component_Main_BuildComponent$buildFormField,
																						_user$project$Helper_FormHelper$Input,
																						'c5_display_name',
																						build.c5_display_name,
																						_elm_lang$core$Maybe$Just(validation.c5_display_name),
																						_user$project$Model_ModelFormType$C3DisplayName),
																					_1: {
																						ctor: '::',
																						_0: A5(
																							_user$project$Component_Main_BuildComponent$buildFormField,
																							_user$project$Helper_FormHelper$Input,
																							'c5_model',
																							build.c5_model,
																							_elm_lang$core$Maybe$Just(validation.c5_model),
																							_user$project$Model_ModelFormType$C3Model),
																						_1: {
																							ctor: '::',
																							_0: A5(
																								_user$project$Component_Main_BuildComponent$buildFormField,
																								_user$project$Helper_FormHelper$Input,
																								'c5_icon',
																								build.c5_icon,
																								_elm_lang$core$Maybe$Just(validation.c5_icon),
																								_user$project$Model_ModelFormType$C3Icon),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_elm_lang$html$Html$h2,
																									{ctor: '[]'},
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('Category Seven'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A5(
																										_user$project$Component_Main_BuildComponent$buildFormField,
																										_user$project$Helper_FormHelper$Input,
																										'c7_name',
																										build.c7_name,
																										_elm_lang$core$Maybe$Just(validation.c7_name),
																										_user$project$Model_ModelFormType$C7Name),
																									_1: {
																										ctor: '::',
																										_0: A5(
																											_user$project$Component_Main_BuildComponent$buildFormField,
																											_user$project$Helper_FormHelper$Input,
																											'c7_display_name',
																											build.c7_display_name,
																											_elm_lang$core$Maybe$Just(validation.c7_display_name),
																											_user$project$Model_ModelFormType$C7DisplayName),
																										_1: {
																											ctor: '::',
																											_0: A5(
																												_user$project$Component_Main_BuildComponent$buildFormField,
																												_user$project$Helper_FormHelper$Input,
																												'c7_model',
																												build.c7_model,
																												_elm_lang$core$Maybe$Just(validation.c7_model),
																												_user$project$Model_ModelFormType$C7Model),
																											_1: {
																												ctor: '::',
																												_0: A5(
																													_user$project$Component_Main_BuildComponent$buildFormField,
																													_user$project$Helper_FormHelper$Input,
																													'c7_icon',
																													build.c7_icon,
																													_elm_lang$core$Maybe$Just(validation.c7_icon),
																													_user$project$Model_ModelFormType$C7Icon),
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			});
	});
var _user$project$Component_Main_BuildComponent$setupComponent = function (domainInput) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('field has-addons'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('control'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$input,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('input'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$type_('text'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$name('domain'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$value('awful.com'),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('control'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('button is-link is-outlined'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onClick(
										_user$project$Msg$OnCheckDomain(domainInput)),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('check'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$button,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button is-link is-outlined'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											_user$project$Msg$OnRegisterDomain(domainInput)),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('register'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('control'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('button is-link is-outlined'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(
												_user$project$Msg$OnAccountSetup(domainInput)),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('setup account'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('control'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$button,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('button is-link is-outlined'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(
													_user$project$Msg$OnServerSetup(domainInput)),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('setup server'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _user$project$Component_Main_BuildComponent$buildComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('build__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Input Domain'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Main_BuildComponent$setupComponent(model.domainInput),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Component_Main_BuildComponent$newWebsiteComponent, model.buildForm, model.buildFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Helper_DataDropdownHelper$awDropdown = {acronym: 'aw', name: 'awful wedding', selection: _user$project$Model_ModelMisc$AW};
var _user$project$Helper_DataDropdownHelper$a9Dropdown = {acronym: 'a9', name: 'awful 90s', selection: _user$project$Model_ModelMisc$A9};
var _user$project$Helper_DataDropdownHelper$ahpDropdown = {acronym: 'ahp', name: 'awful harry potter', selection: _user$project$Model_ModelMisc$AHP};
var _user$project$Helper_DataDropdownHelper$apoDropdown = {acronym: 'apo', name: 'awful pokemon', selection: _user$project$Model_ModelMisc$APO};
var _user$project$Helper_DataDropdownHelper$achDropdown = {acronym: 'ach', name: 'awful child', selection: _user$project$Model_ModelMisc$ACH};
var _user$project$Helper_DataDropdownHelper$apDropdown = {acronym: 'ap', name: 'awful pet', selection: _user$project$Model_ModelMisc$AP};
var _user$project$Helper_DataDropdownHelper$afDropdown = {acronym: 'af', name: 'awful fashion', selection: _user$project$Model_ModelMisc$AF};
var _user$project$Helper_DataDropdownHelper$acDropdown = {acronym: 'ac', name: 'awful christmas', selection: _user$project$Model_ModelMisc$AC};
var _user$project$Helper_DataDropdownHelper$allDropdown = {acronym: 'all', name: 'all', selection: _user$project$Model_ModelMisc$ALL};
var _user$project$Helper_DataDropdownHelper$websiteDropdownList = {
	ctor: '::',
	_0: _user$project$Helper_DataDropdownHelper$allDropdown,
	_1: {
		ctor: '::',
		_0: _user$project$Helper_DataDropdownHelper$acDropdown,
		_1: {
			ctor: '::',
			_0: _user$project$Helper_DataDropdownHelper$afDropdown,
			_1: {
				ctor: '::',
				_0: _user$project$Helper_DataDropdownHelper$apDropdown,
				_1: {
					ctor: '::',
					_0: _user$project$Helper_DataDropdownHelper$achDropdown,
					_1: {
						ctor: '::',
						_0: _user$project$Helper_DataDropdownHelper$ahpDropdown,
						_1: {
							ctor: '::',
							_0: _user$project$Helper_DataDropdownHelper$apoDropdown,
							_1: {
								ctor: '::',
								_0: _user$project$Helper_DataDropdownHelper$a9Dropdown,
								_1: {
									ctor: '::',
									_0: _user$project$Helper_DataDropdownHelper$awDropdown,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$Helper_DataDropdownHelper$acronymToDropdownDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'all', _1: _user$project$Helper_DataDropdownHelper$allDropdown},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'ac', _1: _user$project$Helper_DataDropdownHelper$acDropdown},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'af', _1: _user$project$Helper_DataDropdownHelper$afDropdown},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'ap', _1: _user$project$Helper_DataDropdownHelper$apDropdown},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'ach', _1: _user$project$Helper_DataDropdownHelper$achDropdown},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'apo', _1: _user$project$Helper_DataDropdownHelper$apoDropdown},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'ahp', _1: _user$project$Helper_DataDropdownHelper$ahpDropdown},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'a9', _1: _user$project$Helper_DataDropdownHelper$a9Dropdown},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'aw', _1: _user$project$Helper_DataDropdownHelper$awDropdown},
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$Helper_DataDropdownHelper$websiteDropdownAC = {acronym: 'ac', name: 'all', selection: _user$project$Model_ModelMisc$AC};
var _user$project$Helper_DataDropdownHelper$websiteDropdown = {acronym: 'all', name: 'all', selection: _user$project$Model_ModelMisc$ALL};
var _user$project$Helper_DataDropdownHelper$postTypeDropdownList = {
	ctor: '::',
	_0: {postType: _user$project$Model_ModelPosts$Generic, name: 'generic'},
	_1: {
		ctor: '::',
		_0: {postType: _user$project$Model_ModelPosts$ProductList, name: 'product_list'},
		_1: {ctor: '[]'}
	}
};
var _user$project$Helper_DataDropdownHelper$productTypeDropdownList = {
	ctor: '::',
	_0: {productType: _user$project$Model_ModelProducts$General, name: 'general'},
	_1: {
		ctor: '::',
		_0: {productType: _user$project$Model_ModelProducts$Featured, name: 'featured'},
		_1: {
			ctor: '::',
			_0: {productType: _user$project$Model_ModelProducts$Submission, name: 'submission'},
			_1: {ctor: '[]'}
		}
	}
};
var _user$project$Helper_DataDropdownHelper$socialMediaTypeDropdownList = {
	ctor: '::',
	_0: {socialMediaType: _user$project$Model_ModelSocial$Twitter, name: 'twitter_post'},
	_1: {
		ctor: '::',
		_0: {socialMediaType: _user$project$Model_ModelSocial$Facebook, name: 'facebook_post'},
		_1: {
			ctor: '::',
			_0: {socialMediaType: _user$project$Model_ModelSocial$Pinterest, name: 'pinterest_post'},
			_1: {
				ctor: '::',
				_0: {socialMediaType: _user$project$Model_ModelSocial$Tumblr, name: 'tumblr_post'},
				_1: {ctor: '[]'}
			}
		}
	}
};

var _user$project$Helper_DropdownHelper$dropdownOption = F2(
	function (dropdownSelection, acronym) {
		var name = function (_) {
			return _.name;
		}(
			A2(
				_elm_lang$core$Maybe$withDefault,
				_user$project$Helper_DataDropdownHelper$acDropdown,
				A2(_elm_lang$core$Dict$get, acronym, _user$project$Helper_DataDropdownHelper$acronymToDropdownDictionary)));
		var _p0 = _elm_lang$core$Native_Utils.eq(acronym, dropdownSelection.acronym);
		if (_p0 === true) {
			return A2(
				_elm_lang$html$Html$option,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$value(acronym),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$selected(true),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(name),
					_1: {ctor: '[]'}
				});
		} else {
			return A2(
				_elm_lang$html$Html$option,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$value(acronym),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(name),
					_1: {ctor: '[]'}
				});
		}
	});
var _user$project$Helper_DropdownHelper$dropdownComponent = F3(
	function (model, msg, dropdownSelection) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('field'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('control'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('update__website__dropdown__container select'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$select,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(msg),
										_1: {ctor: '[]'}
									},
									A2(
										_elm_lang$core$List$map,
										_user$project$Helper_DropdownHelper$dropdownOption(dropdownSelection),
										A2(
											_elm_lang$core$List$map,
											function (_) {
												return _.acronym;
											},
											model.developmentDropdown))),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	});
var _user$project$Helper_DropdownHelper$tagOption = function (tagAssoc) {
	return A2(
		_elm_lang$html$Html$option,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$value(tagAssoc.id),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(tagAssoc.name),
			_1: {ctor: '[]'}
		});
};
var _user$project$Helper_DropdownHelper$tagDropdown = function (tagDropdown) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('update__website__dropdown__container select'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$select,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('select is-expanded'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onInput(
							_user$project$Msg$SetPostsField(_user$project$Model_ModelFormType$PostFormTag)),
						_1: {ctor: '[]'}
					}
				},
				A2(_elm_lang$core$List$map, _user$project$Helper_DropdownHelper$tagOption, tagDropdown)),
			_1: {ctor: '[]'}
		});
};
var _user$project$Helper_DropdownHelper$categoryOption = function (productCategory) {
	return A2(
		_elm_lang$html$Html$option,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$value(productCategory.id),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(productCategory.name),
			_1: {ctor: '[]'}
		});
};
var _user$project$Helper_DropdownHelper$categoryDropdown = F2(
	function (productForm, categoryDropdown) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('update__website__dropdown__container select'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$select,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('select is-expanded'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onInput(
								_user$project$Msg$SetProductsField(_user$project$Model_ModelFormType$ProductFormCategory)),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$name('developmentDropdown'),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(_elm_lang$core$List$map, _user$project$Helper_DropdownHelper$categoryOption, categoryDropdown)),
				_1: {ctor: '[]'}
			});
	});
var _user$project$Helper_DropdownHelper$typeOption = function (name) {
	return A2(
		_elm_lang$html$Html$option,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$value(name),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(name),
			_1: {ctor: '[]'}
		});
};
var _user$project$Helper_DropdownHelper$postTypeDropdown = function (postTypeDropdown) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('update__website__dropdown__container select'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$select,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('select is-expanded'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onInput(
							_user$project$Msg$SetPostsField(_user$project$Model_ModelFormType$PostFormPostType)),
						_1: {ctor: '[]'}
					}
				},
				A2(
					_elm_lang$core$List$map,
					_user$project$Helper_DropdownHelper$typeOption,
					A2(
						_elm_lang$core$List$map,
						function (_) {
							return _.name;
						},
						postTypeDropdown))),
			_1: {ctor: '[]'}
		});
};
var _user$project$Helper_DropdownHelper$productTypeDropdown = F2(
	function (productForm, productTypeDropdown) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('update__website__dropdown__container select'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$select,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('select is-expanded'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onInput(
								_user$project$Msg$SetProductsField(_user$project$Model_ModelFormType$ProductFormProductType)),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_elm_lang$core$List$map,
						_user$project$Helper_DropdownHelper$typeOption,
						A2(
							_elm_lang$core$List$map,
							function (_) {
								return _.name;
							},
							productTypeDropdown))),
				_1: {ctor: '[]'}
			});
	});
var _user$project$Helper_DropdownHelper$socialFormDropdown = function (socialMediaTypeDropdownList) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('field'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$label,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('label'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Social Media Type'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('control'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('update__website__dropdown__container select'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$select,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('select is-expanded'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onInput(
												_user$project$Msg$SetSocialField(_user$project$Model_ModelFormType$SocialFormSocialMediaType)),
											_1: {ctor: '[]'}
										}
									},
									A2(
										_elm_lang$core$List$map,
										_user$project$Helper_DropdownHelper$typeOption,
										A2(
											_elm_lang$core$List$map,
											function (x) {
												return x.name;
											},
											socialMediaTypeDropdownList))),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Main_ConfigComponent$individualFormField = F4(
	function (form_type, label_text, field_value, individual_form) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$fieldset,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								form_class.component,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(form_class.input),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(
											_user$project$Msg$SetIndividualEnvField(individual_form)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$value(field_value),
											_1: {ctor: '[]'}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Component_Main_ConfigComponent$commonFormField = F4(
	function (form_type, label_text, field_value, common_form) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$fieldset,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								form_class.component,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(form_class.input),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(
											_user$project$Msg$SetCommonEnvField(common_form)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$value(field_value),
											_1: {ctor: '[]'}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Component_Main_ConfigComponent$configFormField = F4(
	function (form_type, label_text, field_value, config_form) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$fieldset,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								form_class.component,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(form_class.input),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(
											_user$project$Msg$SetConfigFormField(config_form)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$value(field_value),
											_1: {ctor: '[]'}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Component_Main_ConfigComponent$individualEnvComponent = function (individual) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('columns'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('column'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'mailgun_domain', individual.mailgun_domain, _user$project$Model_ModelFormType$IndividualEnvFormMailgunDomain),
					_1: {
						ctor: '::',
						_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'amazon_s3_bucket_name', individual.amazon_s3_bucket_name, _user$project$Model_ModelFormType$IndividualEnvFormAmazonS3BucketName),
						_1: {
							ctor: '::',
							_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'recaptcha_public_key', individual.recaptcha_public_key, _user$project$Model_ModelFormType$IndividualEnvFormRecaptchaPublicKey),
							_1: {
								ctor: '::',
								_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'recaptcha_private_key', individual.recaptcha_private_key, _user$project$Model_ModelFormType$IndividualEnvFormRecaptchaPrivateKey),
								_1: {
									ctor: '::',
									_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'twitter_api_key', individual.twitter_api_key, _user$project$Model_ModelFormType$IndividualEnvFormTwitterApiKey),
									_1: {
										ctor: '::',
										_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'twitter_secret_key', individual.twitter_secret_key, _user$project$Model_ModelFormType$IndividualEnvFormTwitterSecretKey),
										_1: {
											ctor: '::',
											_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'twitter_access_token', individual.twitter_access_token, _user$project$Model_ModelFormType$IndividualEnvFormTwitterAccessToken),
											_1: {
												ctor: '::',
												_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'twitter_access_token_secret', individual.twitter_access_token_secret, _user$project$Model_ModelFormType$IndividualEnvFormTwitterAccessTokenSecret),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$fieldset,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$class('field'),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$label,
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html_Attributes$class('label'),
																	_1: {ctor: '[]'}
																},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$button,
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html_Events$onClick(
																			_user$project$Msg$UpdateEnv(
																				_user$project$Model_ModelConfig$IndividualEnvDataFormType(individual))),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html_Attributes$class('button is-primary is-expanded'),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html_Attributes$type_('submit'),
																				_1: {ctor: '[]'}
																			}
																		}
																	},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('submit'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('column'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'facebook_secret_key', individual.facebook_secret_key, _user$project$Model_ModelFormType$IndividualEnvFormFacebookSecretKey),
						_1: {
							ctor: '::',
							_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'facebook_page_id', individual.facebook_page_id, _user$project$Model_ModelFormType$IndividualEnvFormFacebookPageId),
							_1: {
								ctor: '::',
								_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'facebook_redirect_url', individual.facebook_redirect_url, _user$project$Model_ModelFormType$IndividualEnvFormFacebookRedirectUrl),
								_1: {
									ctor: '::',
									_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'tumblr_api_key', individual.tumblr_api_key, _user$project$Model_ModelFormType$IndividualEnvFormTumblrApiKey),
									_1: {
										ctor: '::',
										_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'tumblr_secret_key', individual.tumblr_secret_key, _user$project$Model_ModelFormType$IndividualEnvFormTumblrSecretKey),
										_1: {
											ctor: '::',
											_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'tumblr_blog_identifier', individual.tumblr_blog_identifier, _user$project$Model_ModelFormType$IndividualEnvFormTumblrBlogIdentifier),
											_1: {
												ctor: '::',
												_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'pintrest_api_key', individual.pintrest_api_key, _user$project$Model_ModelFormType$IndividualEnvFormPintrestApiKey),
												_1: {
													ctor: '::',
													_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'pintrest_secret_key', individual.pintrest_secret_key, _user$project$Model_ModelFormType$IndividualEnvFormPintrestSecretKey),
													_1: {
														ctor: '::',
														_0: A4(_user$project$Component_Main_ConfigComponent$individualFormField, _user$project$Helper_FormHelper$Input, 'facebook_api_key', individual.facebook_api_key, _user$project$Model_ModelFormType$IndividualEnvFormFacebookApiKey),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_Main_ConfigComponent$commonEnvComponent = function (common) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('columns'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('column'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'mailgun_key', common.mailgun_key, _user$project$Model_ModelFormType$CommonEnvFormMailgunKey),
					_1: {
						ctor: '::',
						_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'amazon_associate_tag', common.amazon_associate_tag, _user$project$Model_ModelFormType$CommonEnvFormAmazonAssociateTag),
						_1: {
							ctor: '::',
							_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'aws_access_key_id', common.aws_access_key_id, _user$project$Model_ModelFormType$CommonEnvFormAwsAccessKeyId),
							_1: {
								ctor: '::',
								_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'aws_secret_access_key', common.aws_secret_access_key, _user$project$Model_ModelFormType$CommonEnvFormAwsSecretAccessKey),
								_1: {
									ctor: '::',
									_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'marketplace_host', common.marketplace_host, _user$project$Model_ModelFormType$CommonEnvFormMarketplaceHost),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$fieldset,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('field'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$label,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('label'),
														_1: {ctor: '[]'}
													},
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$button,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Events$onClick(
																_user$project$Msg$UpdateEnv(
																	_user$project$Model_ModelConfig$CommonEnvDataFormType(common))),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html_Attributes$class('button is-primary is-expanded'),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html_Attributes$type_('submit'),
																	_1: {ctor: '[]'}
																}
															}
														},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Submit'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('column'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'amazon_s3_access_key', common.amazon_s3_access_key, _user$project$Model_ModelFormType$CommonEnvFormAmazonS3AccessKey),
						_1: {
							ctor: '::',
							_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'amazon_s3_secret_access_key', common.amazon_s3_secret_access_key, _user$project$Model_ModelFormType$CommonEnvFormAmazonS3SecretAccessKey),
							_1: {
								ctor: '::',
								_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'etsy_api_key', common.etsy_api_key, _user$project$Model_ModelFormType$CommonEnvFormEtsyApiKey),
								_1: {
									ctor: '::',
									_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'etsy_secret_key', common.etsy_secret_key, _user$project$Model_ModelFormType$CommonEnvFormEtsySecretKey),
									_1: {
										ctor: '::',
										_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'tumblr_access_token', common.tumblr_access_token, _user$project$Model_ModelFormType$CommonEnvFormTumblrAccessToken),
										_1: {
											ctor: '::',
											_0: A4(_user$project$Component_Main_ConfigComponent$commonFormField, _user$project$Helper_FormHelper$Input, 'tumblr_access_token_secret', common.tumblr_access_token_secret, _user$project$Model_ModelFormType$CommonEnvFormTumblrAccessTokenSecret),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_Main_ConfigComponent$envComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('manage__env__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Common ENV'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Main_ConfigComponent$commonEnvComponent(model.commonEnvData),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Individual ENV'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A3(_user$project$Helper_DropdownHelper$dropdownComponent, model, _user$project$Msg$FetchIndividualEnv, model.individualEnvDropdownSelection),
						_1: {
							ctor: '::',
							_0: _user$project$Component_Main_ConfigComponent$individualEnvComponent(model.individualEnvData),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _user$project$Component_Main_ConfigComponent$configForm = function (config) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('update__website__form__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Meta'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_title', config.website_title, _user$project$Model_ModelFormType$ConfigFormWebsiteTitle),
				_1: {
					ctor: '::',
					_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'website_description', config.website_description, _user$project$Model_ModelFormType$ConfigFormWebsiteDescription),
					_1: {
						ctor: '::',
						_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_twitter', config.website_twitter, _user$project$Model_ModelFormType$ConfigFormWebsiteTwitter),
						_1: {
							ctor: '::',
							_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_alt_image', config.website_alt_image, _user$project$Model_ModelFormType$ConfigFormWebsiteAltImage),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$h2,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Meta Descriptions'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('columns'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$div,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$class('column'),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'blog_meta_description', config.blog_meta_description, _user$project$Model_ModelFormType$ConfigFormBlogMetaDescription),
													_1: {
														ctor: '::',
														_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'categories_meta_description', config.categories_meta_description, _user$project$Model_ModelFormType$ConfigFormCategoriesMetaDescription),
														_1: {
															ctor: '::',
															_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'updates_meta_description', config.updates_meta_description, _user$project$Model_ModelFormType$ConfigFormUpdatesMetaDescription),
															_1: {
																ctor: '::',
																_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'about_meta_description', config.about_meta_description, _user$project$Model_ModelFormType$ConfigFormAboutMetaDescription),
																_1: {
																	ctor: '::',
																	_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'contact_meta_description', config.contact_meta_description, _user$project$Model_ModelFormType$ConfigFormContactMetaDescription),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$div,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('column'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'register_meta_description', config.register_meta_description, _user$project$Model_ModelFormType$ConfigFormRegisterMetaDescription),
														_1: {
															ctor: '::',
															_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'search_meta_description', config.search_meta_description, _user$project$Model_ModelFormType$ConfigFormSearchMetaDescription),
															_1: {
																ctor: '::',
																_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'login_meta_description', config.login_meta_description, _user$project$Model_ModelFormType$ConfigFormLoginMetaDescription),
																_1: {
																	ctor: '::',
																	_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'submit_meta_description', config.submit_meta_description, _user$project$Model_ModelFormType$ConfigFormSubmitMetaDescription),
																	_1: {
																		ctor: '::',
																		_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'website_keywords', config.website_keywords, _user$project$Model_ModelFormType$ConfigFormWebsiteKeywords),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}),
												_1: {ctor: '[]'}
											}
										}),
									_1: {
										ctor: '::',
										_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'about_copy', config.about_copy, _user$project$Model_ModelFormType$ConfigFormAboutCopy),
										_1: {
											ctor: '::',
											_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'submit_copy', config.submit_copy, _user$project$Model_ModelFormType$ConfigFormSubmitCopy),
											_1: {
												ctor: '::',
												_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$TextArea, 'letter_copy', config.letter_copy, _user$project$Model_ModelFormType$ConfigFormLetterCopy),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$div,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$class('columns'),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$div,
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html_Attributes$class('column'),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$h2,
																		{ctor: '[]'},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('Website Config'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_acronym', config.website_acronym, _user$project$Model_ModelFormType$ConfigFormWebsiteAcronym),
																		_1: {
																			ctor: '::',
																			_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_name', config.website_name, _user$project$Model_ModelFormType$ConfigFormWebsiteName),
																			_1: {
																				ctor: '::',
																				_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_name_lower', config.website_name_lower, _user$project$Model_ModelFormType$ConfigFormWebsiteNameLower),
																				_1: {
																					ctor: '::',
																					_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_domain', config.website_domain, _user$project$Model_ModelFormType$ConfigFormWebsiteDomain),
																					_1: {
																						ctor: '::',
																						_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'google_site_verification', config.google_site_verification, _user$project$Model_ModelFormType$ConfigFormGoogleSiteVerification),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$fieldset,
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html_Attributes$class('field'),
																									_1: {ctor: '[]'}
																								},
																								{
																									ctor: '::',
																									_0: A2(
																										_elm_lang$html$Html$label,
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html_Attributes$class('label'),
																											_1: {ctor: '[]'}
																										},
																										{ctor: '[]'}),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$html$Html$div,
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html_Attributes$class('control'),
																												_1: {ctor: '[]'}
																											},
																											{
																												ctor: '::',
																												_0: A2(
																													_elm_lang$html$Html$label,
																													{
																														ctor: '::',
																														_0: _elm_lang$html$Html_Attributes$class('label'),
																														_1: {ctor: '[]'}
																													},
																													{ctor: '[]'}),
																												_1: {
																													ctor: '::',
																													_0: A2(
																														_elm_lang$html$Html$button,
																														{
																															ctor: '::',
																															_0: _elm_lang$html$Html_Events$onClick(
																																_user$project$Msg$UpdateEnv(
																																	_user$project$Model_ModelConfig$ConfigEnvDataFormType(config))),
																															_1: {
																																ctor: '::',
																																_0: _elm_lang$html$Html_Attributes$class('button is-primary is-expanded'),
																																_1: {
																																	ctor: '::',
																																	_0: _elm_lang$html$Html_Attributes$type_('submit'),
																																	_1: {ctor: '[]'}
																																}
																															}
																														},
																														{
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('Submit'),
																															_1: {ctor: '[]'}
																														}),
																													_1: {ctor: '[]'}
																												}
																											}),
																										_1: {ctor: '[]'}
																									}
																								}),
																							_1: {ctor: '[]'}
																						}
																					}
																				}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$div,
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html_Attributes$class('column'),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$h2,
																			{ctor: '[]'},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('Other'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_logo_png', config.website_logo_png, _user$project$Model_ModelFormType$ConfigFormWebsiteLogoPng),
																			_1: {
																				ctor: '::',
																				_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_logo_svg', config.website_logo_svg, _user$project$Model_ModelFormType$ConfigFormWebsiteLogoSvg),
																				_1: {
																					ctor: '::',
																					_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'website_favicon', config.website_favicon, _user$project$Model_ModelFormType$ConfigFormWebsiteFavicon),
																					_1: {
																						ctor: '::',
																						_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'google_analytics_tracking_id', config.google_analytics_tracking_id, _user$project$Model_ModelFormType$ConfigFormGoogleAnalyticsTrackingId),
																						_1: {
																							ctor: '::',
																							_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'primary_email', config.primary_email, _user$project$Model_ModelFormType$ConfigFormPrimaryEmail),
																							_1: {
																								ctor: '::',
																								_0: A4(_user$project$Component_Main_ConfigComponent$configFormField, _user$project$Helper_FormHelper$Input, 'password', config.password, _user$project$Model_ModelFormType$ConfigFormPassword),
																								_1: {ctor: '[]'}
																							}
																						}
																					}
																				}
																			}
																		}
																	}),
																_1: {ctor: '[]'}
															}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Component_Main_ConfigComponent$configComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('config__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Config Dropdown'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A3(_user$project$Helper_DropdownHelper$dropdownComponent, model, _user$project$Msg$FetchConfig, model.configDropdownSelection),
				_1: {
					ctor: '::',
					_0: _user$project$Component_Main_ConfigComponent$configForm(model.configEnvData),
					_1: {
						ctor: '::',
						_0: _user$project$Component_Main_ConfigComponent$envComponent(model),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};

var _user$project$Helper_TableHelper$tableHeadGenerator = function (tableHeadList) {
	return A2(
		_elm_lang$html$Html$thead,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$tr,
				{ctor: '[]'},
				A2(
					_elm_lang$core$List$map,
					function (x) {
						return A2(
							_elm_lang$html$Html$th,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(x),
								_1: {ctor: '[]'}
							});
					},
					tableHeadList)),
			_1: {ctor: '[]'}
		});
};

var _user$project$Component_Main_DevelopmentComponent$commandComponent = function (commandItem) {
	var commandType = function () {
		var _p0 = commandItem.commandType;
		switch (_p0.ctor) {
			case 'Development':
				return {
					pt: _elm_lang$core$Maybe$Nothing,
					pc: 'is-static',
					dt: _elm_lang$core$Maybe$Just(_user$project$Model_ModelDevelopment$Development),
					dc: 'is-link'
				};
			case 'Production':
				return {
					pt: _elm_lang$core$Maybe$Nothing,
					pc: 'is-link',
					dt: _elm_lang$core$Maybe$Just(_user$project$Model_ModelDevelopment$Production),
					dc: 'is-static'
				};
			default:
				return {
					pt: _elm_lang$core$Maybe$Just(_user$project$Model_ModelDevelopment$Production),
					pc: 'is-link',
					dt: _elm_lang$core$Maybe$Just(_user$project$Model_ModelDevelopment$Development),
					dc: 'is-link'
				};
		}
	}();
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('field has-addons'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('control'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$button,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('button is-static button-width-50px'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(commandItem.key),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('control'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('button is-static button-width-135px'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(commandItem.name),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$button,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(
										A2(_elm_lang$core$Basics_ops['++'], 'button ', commandType.dc)),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											A2(_user$project$Msg$OnCommand, commandItem, commandType.dt)),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('development'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('control'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class(
											A2(_elm_lang$core$Basics_ops['++'], 'button ', commandType.pc)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(
												A2(_user$project$Msg$OnCommand, commandItem, commandType.pt)),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('production'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _user$project$Component_Main_DevelopmentComponent$developmentRow = function (serverStatusItem) {
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('server_status_indicator'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$style(
									{
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'background',
											_1: _user$project$Helper_ViewHelper$convertServerStatus(serverStatusItem.status)
										},
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(serverStatusItem.acronym),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$align('middle'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$button,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onClick(
										A3(_user$project$Msg$OnChangeServer, _user$project$Model_ModelMisc$StartServer, 'development', serverStatusItem.acronym)),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('start'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$align('middle'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											A3(_user$project$Msg$OnChangeServer, _user$project$Model_ModelMisc$RestartServer, 'development', serverStatusItem.acronym)),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('restart'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$align('middle'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$button,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(
												A3(_user$project$Msg$OnChangeServer, _user$project$Model_ModelMisc$StopServer, 'development', serverStatusItem.acronym)),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('stop'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _user$project$Component_Main_DevelopmentComponent$developmentTable = function (serverStatusItemList) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table development__table'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _user$project$Helper_TableHelper$tableHeadGenerator(
					{
						ctor: '::',
						_0: 'status',
						_1: {
							ctor: '::',
							_0: 'website',
							_1: {
								ctor: '::',
								_0: 'start',
								_1: {
									ctor: '::',
									_0: 'restart',
									_1: {
										ctor: '::',
										_0: 'stop',
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$map, _user$project$Component_Main_DevelopmentComponent$developmentRow, serverStatusItemList)));
};
var _user$project$Component_Main_DevelopmentComponent$developmentComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('development__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Development Server Status'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _user$project$Component_Main_DevelopmentComponent$developmentTable(model.developmentServerStatusList),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$h2,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Commands'),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A3(_user$project$Helper_DropdownHelper$dropdownComponent, model, _user$project$Msg$DevelopmentDropdownChange, model.developmentDropdownSelection),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{ctor: '[]'},
									A2(_elm_lang$core$List$map, _user$project$Component_Main_DevelopmentComponent$commandComponent, model.commandsList)),
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Main_OverviewComponent$domainExpirationHead = function (domainExpirationItem) {
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(domainExpirationItem.domain),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(domainExpirationItem.daysTillExpiration),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(domainExpirationItem.expirationDate),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(domainExpirationItem.autoRenewStatus),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(domainExpirationItem.renew),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _user$project$Component_Main_OverviewComponent$domainExpirationComponent = function (domainExpirationItemList) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table domain__expiration__container'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _user$project$Helper_TableHelper$tableHeadGenerator(
					{
						ctor: '::',
						_0: 'domain',
						_1: {
							ctor: '::',
							_0: 'days till expiration',
							_1: {
								ctor: '::',
								_0: 'expiration date',
								_1: {
									ctor: '::',
									_0: 'autorenew status',
									_1: {
										ctor: '::',
										_0: 'renew',
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$map, _user$project$Component_Main_OverviewComponent$domainExpirationHead, domainExpirationItemList)));
};
var _user$project$Component_Main_OverviewComponent$googleAnalyticsHead = function (googleAnalyticsItem) {
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(googleAnalyticsItem.domain),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(googleAnalyticsItem.today),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(googleAnalyticsItem.yesterday),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(googleAnalyticsItem.week),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(googleAnalyticsItem.month),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(googleAnalyticsItem.link),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
};
var _user$project$Component_Main_OverviewComponent$googleAnalyticsComponent = function (googleAnalyticsItemList) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table google__analytics__container'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _user$project$Helper_TableHelper$tableHeadGenerator(
					{
						ctor: '::',
						_0: 'domain',
						_1: {
							ctor: '::',
							_0: 'today',
							_1: {
								ctor: '::',
								_0: 'yesterday',
								_1: {
									ctor: '::',
									_0: 'week',
									_1: {
										ctor: '::',
										_0: 'month',
										_1: {
											ctor: '::',
											_0: 'link',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$map, _user$project$Component_Main_OverviewComponent$googleAnalyticsHead, googleAnalyticsItemList)));
};
var _user$project$Component_Main_OverviewComponent$productionRow = function (serverStatusItem) {
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('server_status_indicator'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$style(
									{
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'background',
											_1: _user$project$Helper_ViewHelper$convertServerStatus(serverStatusItem.status)
										},
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(serverStatusItem.acronym),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$align('middle'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$button,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onClick(
										A3(_user$project$Msg$OnChangeServer, _user$project$Model_ModelMisc$StartServer, 'development', serverStatusItem.acronym)),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('start'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$align('middle'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											A3(_user$project$Msg$OnChangeServer, _user$project$Model_ModelMisc$RestartServer, 'development', serverStatusItem.acronym)),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('restart'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$align('middle'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$button,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(
												A3(_user$project$Msg$OnChangeServer, _user$project$Model_ModelMisc$StopServer, 'development', serverStatusItem.acronym)),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('stop'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _user$project$Component_Main_OverviewComponent$productionServerStatusComponent = function (serverStatusItemList) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table production__server__status__container'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _user$project$Helper_TableHelper$tableHeadGenerator(
					{
						ctor: '::',
						_0: 'status',
						_1: {
							ctor: '::',
							_0: 'website',
							_1: {
								ctor: '::',
								_0: 'start',
								_1: {
									ctor: '::',
									_0: 'restart',
									_1: {
										ctor: '::',
										_0: 'stop',
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$map, _user$project$Component_Main_OverviewComponent$productionRow, serverStatusItemList)));
};
var _user$project$Component_Main_OverviewComponent$websitesOverviewRow = function (websitesItem) {
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(websitesItem.name),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(websitesItem.total_products)),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								_elm_lang$core$Basics$toString(websitesItem.total_products_week)),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(websitesItem.total_products_month)),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(
										_elm_lang$core$Basics$toString(websitesItem.total_products_draft)),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(
											_elm_lang$core$Basics$toString(websitesItem.total_posts)),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
};
var _user$project$Component_Main_OverviewComponent$websitesOverviewTable = function (websitesItemList) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table websites__table'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _user$project$Helper_TableHelper$tableHeadGenerator(
					{
						ctor: '::',
						_0: 'website',
						_1: {
							ctor: '::',
							_0: 'products',
							_1: {
								ctor: '::',
								_0: 'last week',
								_1: {
									ctor: '::',
									_0: 'last month',
									_1: {
										ctor: '::',
										_0: 'products drafted',
										_1: {
											ctor: '::',
											_0: 'posts',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$map, _user$project$Component_Main_OverviewComponent$websitesOverviewRow, websitesItemList)));
};
var _user$project$Component_Main_OverviewComponent$websitesOverviewComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('websites__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Component_Main_OverviewComponent$websitesOverviewTable(model.websitesItemList),
			_1: {ctor: '[]'}
		});
};
var _user$project$Component_Main_OverviewComponent$overviewComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('overview__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Websites Overview'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Main_OverviewComponent$websitesOverviewComponent(model),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Production Server Status'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _user$project$Component_Main_OverviewComponent$productionServerStatusComponent(model.productionServerStatusList),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$h2,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('Google Analytics'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _user$project$Component_Main_OverviewComponent$googleAnalyticsComponent(model.googleAnalyticsData),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$h2,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Domain Expiration'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _user$project$Component_Main_OverviewComponent$domainExpirationComponent(model.domainExpirationData),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		});
};

var _user$project$Component_NavbarComponent$navbarSubItem = function (navbarSubItem) {
	return A2(
		_elm_lang$html$Html$a,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('navbar-item'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$href(
					A2(_elm_lang$core$Basics_ops['++'], '#websites/', navbarSubItem.acronym)),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(navbarSubItem.name),
			_1: {ctor: '[]'}
		});
};
var _user$project$Component_NavbarComponent$navbarItem = F2(
	function (route, navbarItem) {
		var isActive = _elm_lang$core$Native_Utils.eq(route, navbarItem.route);
		var _p0 = navbarItem.main;
		if (_p0 === 'overview') {
			var _p1 = isActive;
			if (_p1 === true) {
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('navbar-item has-dropdown is-hoverable'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$a,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('navbar-link'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$href(
										A2(_elm_lang$core$Basics_ops['++'], '#', navbarItem.main)),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(navbarItem.main),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('navbar-dropdown'),
									_1: {ctor: '[]'}
								},
								A2(_elm_lang$core$List$map, _user$project$Component_NavbarComponent$navbarSubItem, navbarItem.sub)),
							_1: {ctor: '[]'}
						}
					});
			} else {
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('navbar-item has-dropdown is-hoverable'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$a,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('navbar-link'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$href(
										A2(_elm_lang$core$Basics_ops['++'], '#', navbarItem.main)),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(navbarItem.main),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('navbar-dropdown'),
									_1: {ctor: '[]'}
								},
								A2(_elm_lang$core$List$map, _user$project$Component_NavbarComponent$navbarSubItem, navbarItem.sub)),
							_1: {ctor: '[]'}
						}
					});
			}
		} else {
			var _p2 = isActive;
			if (_p2 === true) {
				return A2(
					_elm_lang$html$Html$a,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('navbar-item is-active'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$href(
								A2(_elm_lang$core$Basics_ops['++'], '#', navbarItem.main)),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(navbarItem.main),
						_1: {ctor: '[]'}
					});
			} else {
				return A2(
					_elm_lang$html$Html$a,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('navbar-item'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$href(
								A2(_elm_lang$core$Basics_ops['++'], '#', navbarItem.main)),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(navbarItem.main),
						_1: {ctor: '[]'}
					});
			}
		}
	});
var _user$project$Component_NavbarComponent$navbarComponent = function (model) {
	return A2(
		_elm_lang$html$Html$nav,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('navbar navbar__container'),
			_1: {
				ctor: '::',
				_0: _fapian$elm_html_aria$Html_Attributes_Aria$role('navigation'),
				_1: {
					ctor: '::',
					_0: _fapian$elm_html_aria$Html_Attributes_Aria$ariaLabel('main navigation'),
					_1: {ctor: '[]'}
				}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('navbar-brand'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$a,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('navbar-item'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$href('/admin'),
								_1: {ctor: '[]'}
							}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$img,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$src('https://bulma.io/images/bulma-logo.png'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$alt('Bulma: a modern CSS framework based on Flexbox'),
										_1: {ctor: '[]'}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('button navbar-burger'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$span,
									{ctor: '[]'},
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$span,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$span,
											{ctor: '[]'},
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('navbar-menu'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('navbar-start'),
								_1: {ctor: '[]'}
							},
							A2(
								_elm_lang$core$List$map,
								_user$project$Component_NavbarComponent$navbarItem(model.route),
								model.navbarWebsiteItems)),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Posts_FormComponent$postFormField = F5(
	function (form_type, label_text, field_value, validation_value, post_form) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								form_class.component,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(form_class.input),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(
											_user$project$Msg$SetPostsField(post_form)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onBlur(_user$project$Msg$OnBlurCheckPostFormValidation),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$value(field_value),
												_1: {ctor: '[]'}
											}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _user$project$Helper_FormHelper$showValidation(
							A2(_elm_lang$core$Maybe$withDefault, _user$project$Helper_FormHelper$noValidation, validation_value)),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$Component_Posts_FormComponent$postForm = F3(
	function (model, post, validation) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('columns'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('column'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A5(
							_user$project$Component_Posts_FormComponent$postFormField,
							_user$project$Helper_FormHelper$Input,
							'Display Name',
							post.display_name,
							_elm_lang$core$Maybe$Just(validation.display_name),
							_user$project$Model_ModelFormType$PostFormDisplayName),
						_1: {
							ctor: '::',
							_0: A5(
								_user$project$Component_Posts_FormComponent$postFormField,
								_user$project$Helper_FormHelper$TextArea,
								'Excerpt',
								post.excerpt,
								_elm_lang$core$Maybe$Just(validation.excerpt),
								_user$project$Model_ModelFormType$PostFormExcerpt),
							_1: {
								ctor: '::',
								_0: A5(
									_user$project$Component_Posts_FormComponent$postFormField,
									_user$project$Helper_FormHelper$Number,
									'Featured Image',
									post.featured_image,
									_elm_lang$core$Maybe$Just(validation.featured_image),
									_user$project$Model_ModelFormType$PostFormFeaturedImage),
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('column'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('field'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$label,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('label'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Post Type'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('control'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _user$project$Helper_DropdownHelper$postTypeDropdown(model.postTypeDropdownList),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('field field-category'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$label,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('label'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('Tag'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _user$project$Helper_DropdownHelper$tagDropdown(model.tagAssocList),
											_1: {ctor: '[]'}
										}
									}),
								_1: {
									ctor: '::',
									_0: A5(
										_user$project$Component_Posts_FormComponent$postFormField,
										_user$project$Helper_FormHelper$Number,
										'Product Limit',
										_elm_lang$core$Basics$toString(
											A2(_elm_lang$core$Maybe$withDefault, 0, post.product_limit)),
										_elm_lang$core$Maybe$Nothing,
										_user$project$Model_ModelFormType$PostFormProductLimit),
									_1: {
										ctor: '::',
										_0: A5(
											_user$project$Component_Posts_FormComponent$postFormField,
											_user$project$Helper_FormHelper$Number,
											'Product Offset',
											_elm_lang$core$Basics$toString(
												A2(_elm_lang$core$Maybe$withDefault, 0, post.product_offset)),
											_elm_lang$core$Maybe$Nothing,
											_user$project$Model_ModelFormType$PostFormProductOffset),
										_1: {ctor: '[]'}
									}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Component_Posts_FormComponent$tagRow = function (tag) {
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$align('middle'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(tag.display_name),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$align('middle'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(
								_elm_lang$core$List$length(tag.products))),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$align('middle'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								_elm_lang$core$Basics$toString(
									_elm_lang$core$List$length(tag.posts))),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _user$project$Component_Posts_FormComponent$tagTable = function (model) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Helper_TableHelper$tableHeadGenerator(
				{
					ctor: '::',
					_0: 'Tag',
					_1: {
						ctor: '::',
						_0: 'Products',
						_1: {
							ctor: '::',
							_0: 'Posts',
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(_elm_lang$core$List$map, _user$project$Component_Posts_FormComponent$tagRow, model.tagAssocList)),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Posts_EditComponent$editPostsComponent = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Edit Post'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									A2(
										_user$project$Msg$ItemUpdate,
										_user$project$Model_ModelDataType$PostDataFormType(_p2.postForm),
										_p1._1)),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$type_(''),
										_1: {ctor: '[]'}
									}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Submit'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Posts_FormComponent$tagTable(_p2),
				_1: {
					ctor: '::',
					_0: A3(_user$project$Component_Posts_FormComponent$postForm, _p2, _p2.postForm, _p2.postFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Helper_ConvertHelper$updateToUpdateForm = function (update) {
	return {display_name: update.display_name, title: update.title, excerpt: update.excerpt, author: update.author, draft: update.draft, schedule_date: update.schedule_date};
};
var _user$project$Helper_ConvertHelper$tagAssocToTagForm = function (tagAssoc) {
	return {display_name: tagAssoc.display_name, description: tagAssoc.description};
};
var _user$project$Helper_ConvertHelper$socialToSocialForm = function (social) {
	return {display_name: social.display_name, description: social.description, tags: social.tags, draft: social.draft, schedule_date: social.schedule_date, facebook_code: social.facebook_code, featured_image: social.featured_image, url: social.url, image_caption: social.image_caption, social_media_type: social.social_media_type};
};
var _user$project$Helper_ConvertHelper$postAssocToProductForm = function (postAssoc) {
	return {display_name: postAssoc.display_name, author: postAssoc.author, excerpt: postAssoc.excerpt, featured_image: postAssoc.featured_image, post_type: postAssoc.post_type, tag: postAssoc.tag, product_limit: postAssoc.product_limit, product_offset: postAssoc.product_offset};
};
var _user$project$Helper_ConvertHelper$productAssocToProductForm = function (productAssoc) {
	return {
		display_name: productAssoc.display_name,
		description: productAssoc.description,
		blog_description: productAssoc.blog_description,
		original_featured_image: '',
		featured_image: productAssoc.featured_image,
		draft: productAssoc.draft,
		schedule_date: productAssoc.schedule_date,
		cta: productAssoc.cta,
		price: productAssoc.price,
		url: productAssoc.url,
		url_text: productAssoc.url_text,
		category: productAssoc.category,
		category_id: productAssoc.category.id,
		tag_id: A2(
			_elm_lang$core$List$map,
			function (x) {
				return x.id;
			},
			productAssoc.product_tags),
		product_like: productAssoc.product_like.total,
		product_type: productAssoc.product_type
	};
};

var _user$project$Component_Posts_IndexComponent$indexPostsRow = F4(
	function (acronym, websiteType, websiteAction, post) {
		return A2(
			_elm_lang$html$Html$tr,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$align('middle'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(post.display_name),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$align('middle'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(post.excerpt),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$align('middle'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(post.post_type),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$align('middle'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(
										_elm_lang$core$Basics$toString(post.product_limit)),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$align('middle'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(
											_elm_lang$core$Basics$toString(post.product_offset)),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$td,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$align('middle'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$a,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$href(
														A2(
															_elm_lang$core$Basics_ops['++'],
															'#websites/',
															A2(
																_elm_lang$core$Basics_ops['++'],
																acronym,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	'/',
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		websiteType,
																		A2(_elm_lang$core$Basics_ops['++'], '/show/', post.id)))))),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Events$onClick(
															_user$project$Msg$PopulateIndividual(
																_user$project$Model_ModelDataType$PostDataViewType(post))),
														_1: {ctor: '[]'}
													}
												},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('show'),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$td,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$align('middle'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$a,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$href(
															A2(
																_elm_lang$core$Basics_ops['++'],
																'#websites/',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	acronym,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		'/',
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			websiteType,
																			A2(_elm_lang$core$Basics_ops['++'], '/edit/', post.id)))))),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Events$onClick(
																_user$project$Msg$PopulateForm(
																	_user$project$Model_ModelDataType$PostDataFormType(
																		_user$project$Helper_ConvertHelper$postAssocToProductForm(post)))),
															_1: {ctor: '[]'}
														}
													},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('edit'),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$td,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$align('middle'),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$a,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$href(
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	'#websites/',
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		acronym,
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			'/',
																			A2(_elm_lang$core$Basics_ops['++'], websiteType, '/index'))))),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html_Events$onClick(
																	A2(_user$project$Msg$ItemDelete, 'posts', post.id)),
																_1: {ctor: '[]'}
															}
														},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('delete'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var _user$project$Component_Posts_IndexComponent$indexPostsHeadRow = A2(
	_elm_lang$html$Html$thead,
	{ctor: '[]'},
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$tr,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$th,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('display_name'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$th,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('excerpt'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$th,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('post_type'),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$th,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('product_limit'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$th,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('product_offset'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$th,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('show'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$th,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('edit'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$th,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('delete'),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}),
		_1: {ctor: '[]'}
	});
var _user$project$Component_Posts_IndexComponent$indexPostsTable = function (model) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Component_Posts_IndexComponent$indexPostsHeadRow,
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(
						_elm_lang$core$List$map,
						A3(_user$project$Component_Posts_IndexComponent$indexPostsRow, model.routeAcronym, model.routeType, model.routeAction),
						model.postList)),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_Posts_IndexComponent$indexPostsComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Posts Index'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Posts_IndexComponent$indexPostsTable(model),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Posts_NewComponent$newPostsComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('New Post'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									_user$project$Msg$ItemCreate(
										_user$project$Model_ModelDataType$PostDataFormType(model.postForm))),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Submit'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Posts_FormComponent$tagTable(model),
				_1: {
					ctor: '::',
					_0: A3(_user$project$Component_Posts_FormComponent$postForm, model, model.postForm, model.postFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Component_Posts_ShowComponent$showComponent = function (post) {
	return A2(
		_elm_lang$html$Html$ul,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(_user$project$Helper_FormHelper$showListItem, 'id', post.id),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Helper_FormHelper$showListItem, 'name', post.name),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Helper_FormHelper$showListItem, 'display_name', post.display_name),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Helper_FormHelper$showListItem, 'author', post.author),
						_1: {
							ctor: '::',
							_0: A2(_user$project$Helper_FormHelper$showListItem, 'excerpt', post.excerpt),
							_1: {
								ctor: '::',
								_0: A2(_user$project$Helper_FormHelper$showListItem, 'featured_image', post.featured_image),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Helper_FormHelper$showListItem, 'post_type', post.post_type),
									_1: {
										ctor: '::',
										_0: A2(
											_user$project$Helper_FormHelper$showListItem,
											'product_limit',
											_elm_lang$core$Basics$toString(post.product_limit)),
										_1: {
											ctor: '::',
											_0: A2(
												_user$project$Helper_FormHelper$showListItem,
												'product_offset',
												_elm_lang$core$Basics$toString(post.product_offset)),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Component_Posts_ShowComponent$showPostsComponent = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Show Post'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Posts_ShowComponent$showComponent(_p1._0.individualPost),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Products_FormComponent$multiSelectOptions = function (model) {
	var defaultOptions = _user$project$Component_MultiSelect$defaultOptions(_user$project$Msg$MultiSelectChanged);
	return _elm_lang$core$Native_Utils.update(
		defaultOptions,
		{items: model.multiSelectTagIdList});
};
var _user$project$Component_Products_FormComponent$isNumberNegative = function ($int) {
	return (_elm_lang$core$Native_Utils.cmp($int, 0) > 0) ? '#23d160' : '#ff3860';
};
var _user$project$Component_Products_FormComponent$productCount = function (count) {
	var _p0 = count;
	if (_p0.ctor === 'Just') {
		var _p1 = _p0._0;
		var color = _user$project$Component_Products_FormComponent$isNumberNegative(_p1);
		return A2(
			_elm_lang$html$Html$p,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'color', _1: color},
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'count: ',
						_elm_lang$core$Basics$toString(_p1))),
				_1: {ctor: '[]'}
			});
	} else {
		return A2(
			_elm_lang$html$Html$span,
			{ctor: '[]'},
			{ctor: '[]'});
	}
};
var _user$project$Component_Products_FormComponent$productFormField = F6(
	function (form_type, label_text, field_value, validation_value, product_form, count) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: _user$project$Component_Products_FormComponent$productCount(count),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('control'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									form_class.component,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class(form_class.input),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onInput(
												_user$project$Msg$SetProductsField(product_form)),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onBlur(_user$project$Msg$OnBlurCheckProductFormValidation),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$value(field_value),
													_1: {ctor: '[]'}
												}
											}
										}
									},
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _user$project$Helper_FormHelper$showValidation(
								A2(_elm_lang$core$Maybe$withDefault, _user$project$Helper_FormHelper$noValidation, validation_value)),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _user$project$Component_Products_FormComponent$productForm = F3(
	function (model, product, validation) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('columns'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('success'),
										_1: {ctor: '[]'}
									},
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: A6(
										_user$project$Component_Products_FormComponent$productFormField,
										_user$project$Helper_FormHelper$TextArea,
										'Display Name',
										product.display_name,
										_elm_lang$core$Maybe$Just(validation.display_name),
										_user$project$Model_ModelFormType$ProductFormDisplayName,
										model.productFormDisplayNameCount),
									_1: {
										ctor: '::',
										_0: A6(
											_user$project$Component_Products_FormComponent$productFormField,
											_user$project$Helper_FormHelper$TextArea,
											'Description',
											product.description,
											_elm_lang$core$Maybe$Just(validation.description),
											_user$project$Model_ModelFormType$ProductFormDescription,
											model.productFormDescriptionCount),
										_1: {
											ctor: '::',
											_0: A6(
												_user$project$Component_Products_FormComponent$productFormField,
												_user$project$Helper_FormHelper$TextArea,
												'Blog Description',
												product.blog_description,
												_elm_lang$core$Maybe$Just(validation.blog_description),
												_user$project$Model_ModelFormType$ProductFormBlogDescription,
												model.productFormBlogDescriptionCount),
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('column'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A6(_user$project$Component_Products_FormComponent$productFormField, _user$project$Helper_FormHelper$Input, 'Original Featured Image', product.original_featured_image, _elm_lang$core$Maybe$Nothing, _user$project$Model_ModelFormType$ProductFormOriginalFeaturedImage, _elm_lang$core$Maybe$Nothing),
									_1: {
										ctor: '::',
										_0: A6(
											_user$project$Component_Products_FormComponent$productFormField,
											_user$project$Helper_FormHelper$Input,
											'Featured Image',
											product.featured_image,
											_elm_lang$core$Maybe$Just(validation.featured_image),
											_user$project$Model_ModelFormType$ProductFormFeaturedImage,
											_elm_lang$core$Maybe$Nothing),
										_1: {
											ctor: '::',
											_0: A6(
												_user$project$Component_Products_FormComponent$productFormField,
												_user$project$Helper_FormHelper$Input,
												'URL',
												product.url,
												_elm_lang$core$Maybe$Just(validation.url),
												_user$project$Model_ModelFormType$ProductFormUrl,
												_elm_lang$core$Maybe$Nothing),
											_1: {
												ctor: '::',
												_0: A6(
													_user$project$Component_Products_FormComponent$productFormField,
													_user$project$Helper_FormHelper$Number,
													'Price',
													_elm_lang$core$Basics$toString(product.price),
													_elm_lang$core$Maybe$Just(validation.price),
													_user$project$Model_ModelFormType$ProductFormPrice,
													_elm_lang$core$Maybe$Nothing),
												_1: {
													ctor: '::',
													_0: A6(
														_user$project$Component_Products_FormComponent$productFormField,
														_user$project$Helper_FormHelper$Input,
														'Cta',
														product.cta,
														_elm_lang$core$Maybe$Just(validation.cta),
														_user$project$Model_ModelFormType$ProductFormCta,
														_elm_lang$core$Maybe$Nothing),
													_1: {
														ctor: '::',
														_0: A6(
															_user$project$Component_Products_FormComponent$productFormField,
															_user$project$Helper_FormHelper$Number,
															'Product Like Total',
															_elm_lang$core$Basics$toString(product.product_like),
															_elm_lang$core$Maybe$Just(validation.product_like),
															_user$project$Model_ModelFormType$ProductFormLikeTotal,
															_elm_lang$core$Maybe$Nothing),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			});
	});
var _user$project$Component_Products_FormComponent$newProductsFinderComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('product__finder__container margin-bottom-2rem'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('field has-addons'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$input,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('input'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$type_('text'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onInput(_user$project$Msg$OnProductFinderInput),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onBlur(_user$project$Msg$OnBlurCheckProductFormValidation),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$value(model.productFinderInput),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$placeholder('B0143RT8OY'),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('control'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(_user$project$Msg$PrefilNewProduct),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('search!'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('field'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_user$project$Helper_DropdownHelper$categoryDropdown, model.productForm, model.categoryList),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('field'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A3(
								_user$project$Component_MultiSelect$multiSelect,
								_user$project$Component_Products_FormComponent$multiSelectOptions(model),
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('no-classsssssss'),
									_1: {ctor: '[]'}
								},
								model.multiSelectTagIdSelected),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('field'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(_user$project$Helper_DropdownHelper$productTypeDropdown, model.productForm, model.productTypeDropdownList),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};

var _user$project$Component_Products_EditComponent$editProductsComponent = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Edit Product'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('field'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$label,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('label'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Schedule date'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$map,
										_user$project$Msg$ToDatePicker,
										A3(_elm_community$elm_datepicker$DatePicker$view, _p2.date, _elm_community$elm_datepicker$DatePicker$defaultSettings, _p2.datePicker)),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('field'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$label,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('label'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Draft'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$input,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('checkbox pDraft'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onClick(_user$project$Msg$SetProductsCheckbox),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$value('true'),
															_1: {ctor: '[]'}
														}
													}
												}
											},
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											A2(
												_user$project$Msg$ItemUpdate,
												_user$project$Model_ModelDataType$ProductDataFormType(_p2.productForm),
												_p1._1)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$type_('submit'),
												_1: {ctor: '[]'}
											}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Submit'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Products_FormComponent$newProductsFinderComponent(_p2),
				_1: {
					ctor: '::',
					_0: A3(_user$project$Component_Products_FormComponent$productForm, _p2, _p2.productForm, _p2.productFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Component_Products_IndexComponent$indexProductsRow = F4(
	function (acronym, websiteType, websiteAction, productAssoc) {
		return A2(
			_elm_lang$html$Html$tr,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$align('middle'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(productAssoc.display_name),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$align('middle'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(productAssoc.category.name),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$align('middle'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$a,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$href(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'#websites/',
												A2(
													_elm_lang$core$Basics_ops['++'],
													acronym,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'/',
														A2(
															_elm_lang$core$Basics_ops['++'],
															websiteType,
															A2(_elm_lang$core$Basics_ops['++'], '/show/', productAssoc.id)))))),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(
												_user$project$Msg$PopulateIndividual(
													_user$project$Model_ModelDataType$ProductDataViewType(productAssoc))),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('show'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$align('middle'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$a,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$href(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'#websites/',
													A2(
														_elm_lang$core$Basics_ops['++'],
														acronym,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'/',
															A2(
																_elm_lang$core$Basics_ops['++'],
																websiteType,
																A2(_elm_lang$core$Basics_ops['++'], '/edit/', productAssoc.id)))))),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(
													_user$project$Msg$PopulateForm(
														_user$project$Model_ModelDataType$ProductDataFormType(
															_user$project$Helper_ConvertHelper$productAssocToProductForm(productAssoc)))),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('edit'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$align('middle'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$a,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$href(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'#websites/',
														A2(
															_elm_lang$core$Basics_ops['++'],
															acronym,
															A2(
																_elm_lang$core$Basics_ops['++'],
																'/',
																A2(_elm_lang$core$Basics_ops['++'], websiteType, '/index'))))),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onClick(
														A2(_user$project$Msg$ItemDelete, 'products', productAssoc.id)),
													_1: {ctor: '[]'}
												}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('delete'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			});
	});
var _user$project$Component_Products_IndexComponent$indexProductsTable = function (model) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Helper_TableHelper$tableHeadGenerator(
				{
					ctor: '::',
					_0: 'display_name',
					_1: {
						ctor: '::',
						_0: 'category',
						_1: {
							ctor: '::',
							_0: 'show',
							_1: {
								ctor: '::',
								_0: 'edit',
								_1: {
									ctor: '::',
									_0: 'delete',
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(
						_elm_lang$core$List$map,
						A3(_user$project$Component_Products_IndexComponent$indexProductsRow, model.routeAcronym, model.routeType, model.routeAction),
						model.productAssocList)),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_Products_IndexComponent$indexProductsComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Products Index'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Products_IndexComponent$indexProductsTable(model),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Products_NewComponent$newProductsComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('New Product'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('field'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$label,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('label'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Schedule date'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$map,
										_user$project$Msg$ToDatePicker,
										A3(_elm_community$elm_datepicker$DatePicker$view, model.date, _elm_community$elm_datepicker$DatePicker$defaultSettings, model.datePicker)),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('field'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$label,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('label'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Draft'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$input,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('checkbox pDraft'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onClick(_user$project$Msg$SetProductsCheckbox),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$value('true'),
															_1: {ctor: '[]'}
														}
													}
												}
											},
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											_user$project$Msg$ItemCreate(
												_user$project$Model_ModelDataType$ProductDataFormType(model.productForm))),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$type_('submit'),
												_1: {ctor: '[]'}
											}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Submit'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Products_FormComponent$newProductsFinderComponent(model),
				_1: {
					ctor: '::',
					_0: A3(_user$project$Component_Products_FormComponent$productForm, model, model.productForm, model.productFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Component_Products_ShowComponent$showComponent = function (product) {
	return A2(
		_elm_lang$html$Html$ul,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(_user$project$Helper_FormHelper$showListItem, 'id', product.id),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Helper_FormHelper$showListItem, 'name', product.name),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Helper_FormHelper$showListItem, 'display_name', product.display_name),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Helper_FormHelper$showListItem, 'description', product.description),
						_1: {
							ctor: '::',
							_0: A2(_user$project$Helper_FormHelper$showListItem, 'blog_description', product.blog_description),
							_1: {
								ctor: '::',
								_0: A2(_user$project$Helper_FormHelper$showListItem, 'featured_image', product.featured_image),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Helper_FormHelper$showListItem, 'cta', product.cta),
									_1: {
										ctor: '::',
										_0: A2(
											_user$project$Helper_FormHelper$showListItem,
											'price',
											_elm_lang$core$Basics$toString(product.price)),
										_1: {
											ctor: '::',
											_0: A2(_user$project$Helper_FormHelper$showListItem, 'product_type', product.product_type),
											_1: {
												ctor: '::',
												_0: A2(_user$project$Helper_FormHelper$showListItem, 'url', product.url),
												_1: {
													ctor: '::',
													_0: A2(_user$project$Helper_FormHelper$showListItem, 'url_text', product.url_text),
													_1: {
														ctor: '::',
														_0: A2(_user$project$Helper_FormHelper$showListItem, 'inserted_at', product.inserted_at),
														_1: {
															ctor: '::',
															_0: A2(_user$project$Helper_FormHelper$showListItem, 'category', product.category.display_name),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Component_Products_ShowComponent$showProductsComponent = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Show Post'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Products_ShowComponent$showComponent(_p1._0.individualProduct),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Social_FormComponent$socialFormField = F5(
	function (form_type, label_text, field_value, validation_value, social_form) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								form_class.component,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(form_class.input),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(
											_user$project$Msg$SetSocialField(social_form)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onBlur(_user$project$Msg$OnBlurCheckSocialFormValidation),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$value(field_value),
												_1: {ctor: '[]'}
											}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _user$project$Helper_FormHelper$showValidation(
							A2(_elm_lang$core$Maybe$withDefault, _user$project$Helper_FormHelper$noValidation, validation_value)),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$Component_Social_FormComponent$socialForm = F3(
	function (model, socialForm, socialFormValidation) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('columns'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('column'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A5(
							_user$project$Component_Social_FormComponent$socialFormField,
							_user$project$Helper_FormHelper$Input,
							'Display Name',
							socialForm.display_name,
							_elm_lang$core$Maybe$Just(socialFormValidation.display_name),
							_user$project$Model_ModelFormType$SocialFormDisplayName),
						_1: {
							ctor: '::',
							_0: A5(
								_user$project$Component_Social_FormComponent$socialFormField,
								_user$project$Helper_FormHelper$TextArea,
								'Description',
								socialForm.description,
								_elm_lang$core$Maybe$Just(socialFormValidation.description),
								_user$project$Model_ModelFormType$SocialFormDescription),
							_1: {
								ctor: '::',
								_0: A5(
									_user$project$Component_Social_FormComponent$socialFormField,
									_user$project$Helper_FormHelper$TextArea,
									'Tags',
									socialForm.tags,
									_elm_lang$core$Maybe$Just(socialFormValidation.tags),
									_user$project$Model_ModelFormType$SocialFormTags),
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('column'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _user$project$Helper_DropdownHelper$socialFormDropdown(model.socialMediaTypeDropdownList),
							_1: {
								ctor: '::',
								_0: A5(
									_user$project$Component_Social_FormComponent$socialFormField,
									_user$project$Helper_FormHelper$Input,
									'Featured Image',
									socialForm.featured_image,
									_elm_lang$core$Maybe$Just(socialFormValidation.featured_image),
									_user$project$Model_ModelFormType$SocialFormFeaturedImage),
								_1: {
									ctor: '::',
									_0: A5(
										_user$project$Component_Social_FormComponent$socialFormField,
										_user$project$Helper_FormHelper$Input,
										'URL',
										socialForm.url,
										_elm_lang$core$Maybe$Just(socialFormValidation.url),
										_user$project$Model_ModelFormType$SocialFormUrl),
									_1: {
										ctor: '::',
										_0: A5(
											_user$project$Component_Social_FormComponent$socialFormField,
											_user$project$Helper_FormHelper$Input,
											'Image Caption',
											socialForm.image_caption,
											_elm_lang$core$Maybe$Just(socialFormValidation.image_caption),
											_user$project$Model_ModelFormType$SocialFormImageCaption),
										_1: {
											ctor: '::',
											_0: A5(_user$project$Component_Social_FormComponent$socialFormField, _user$project$Helper_FormHelper$Input, 'Facebook Code', socialForm.facebook_code, _elm_lang$core$Maybe$Nothing, _user$project$Model_ModelFormType$SocialFormFacebookCode),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Component_Social_FormComponent$productTableRow = function (product) {
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(product.display_name),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(product.inserted_at),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('prefillSocialMedia'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											_user$project$Msg$PrefilSocialMediaForm(product)),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('Fill Me'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _user$project$Component_Social_FormComponent$productTable = function (model) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Helper_TableHelper$tableHeadGenerator(
				{
					ctor: '::',
					_0: 'Product',
					_1: {
						ctor: '::',
						_0: 'Created',
						_1: {
							ctor: '::',
							_0: 'Filled?',
							_1: {
								ctor: '::',
								_0: 'Fill',
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(_elm_lang$core$List$map, _user$project$Component_Social_FormComponent$productTableRow, model.productAssocList)),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Social_EditComponent$editSocialComponent = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Edit Social'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('field field-schedule'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$label,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('label'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Schedule Date'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$map,
										_user$project$Msg$ToDatePicker,
										A3(_elm_community$elm_datepicker$DatePicker$view, _p2.date, _elm_community$elm_datepicker$DatePicker$defaultSettings, _p2.datePicker)),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('field'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$label,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('label'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Draft'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('control'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$input,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('checkbox'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html_Events$onInput(
																	_user$project$Msg$SetSocialField(_user$project$Model_ModelFormType$SocialFormDraft)),
																_1: {ctor: '[]'}
															}
														}
													},
													{ctor: '[]'}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											A2(
												_user$project$Msg$ItemUpdate,
												_user$project$Model_ModelDataType$SocialDataFormType(_p2.socialForm),
												_p1._1)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Submit'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Social_FormComponent$productTable(_p2),
				_1: {
					ctor: '::',
					_0: A3(_user$project$Component_Social_FormComponent$socialForm, _p2, _p2.socialForm, _p2.socialFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Component_Social_IndexComponent$indexSocialRow = F4(
	function (acronym, websiteType, websiteAction, social) {
		return A2(
			_elm_lang$html$Html$tr,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$align('middle'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(social.display_name),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$align('middle'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(social.description),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$align('middle'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(social.schedule_date)),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$align('middle'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$a,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$href(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'#websites/',
													A2(
														_elm_lang$core$Basics_ops['++'],
														acronym,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'/',
															A2(
																_elm_lang$core$Basics_ops['++'],
																websiteType,
																A2(_elm_lang$core$Basics_ops['++'], '/show/', social.id)))))),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(
													_user$project$Msg$PopulateIndividual(
														_user$project$Model_ModelDataType$SocialDataViewType(social))),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('show'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$align('middle'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$a,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$href(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'#websites/',
														A2(
															_elm_lang$core$Basics_ops['++'],
															acronym,
															A2(
																_elm_lang$core$Basics_ops['++'],
																'/',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	websiteType,
																	A2(_elm_lang$core$Basics_ops['++'], '/edit/', social.id)))))),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onClick(
														_user$project$Msg$PopulateForm(
															_user$project$Model_ModelDataType$SocialDataFormType(
																_user$project$Helper_ConvertHelper$socialToSocialForm(social)))),
													_1: {ctor: '[]'}
												}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('edit'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$td,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$align('middle'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$a,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$href(
														A2(
															_elm_lang$core$Basics_ops['++'],
															'#websites/',
															A2(
																_elm_lang$core$Basics_ops['++'],
																acronym,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	'/',
																	A2(_elm_lang$core$Basics_ops['++'], websiteType, '/index'))))),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Events$onClick(
															A2(_user$project$Msg$ItemDelete, 'social', social.id)),
														_1: {ctor: '[]'}
													}
												},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('delete'),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			});
	});
var _user$project$Component_Social_IndexComponent$indexSocialTable = function (model) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Helper_TableHelper$tableHeadGenerator(
				{
					ctor: '::',
					_0: 'display_name',
					_1: {
						ctor: '::',
						_0: 'description',
						_1: {
							ctor: '::',
							_0: 'schedule_date',
							_1: {
								ctor: '::',
								_0: 'show',
								_1: {
									ctor: '::',
									_0: 'edit',
									_1: {
										ctor: '::',
										_0: 'delete',
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(
						_elm_lang$core$List$map,
						A3(_user$project$Component_Social_IndexComponent$indexSocialRow, model.routeAcronym, model.routeType, model.routeAction),
						model.socialList)),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_Social_IndexComponent$indexSocialComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Social Index'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Social_IndexComponent$indexSocialTable(model),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Social_NewComponent$newSocialComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('New Social'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('field field-schedule'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$label,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('label'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Schedule Date'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$map,
										_user$project$Msg$ToDatePicker,
										A3(_elm_community$elm_datepicker$DatePicker$view, model.date, _elm_community$elm_datepicker$DatePicker$defaultSettings, model.datePicker)),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('field'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$label,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('label'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Draft'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('control'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$input,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('checkbox'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html_Events$onInput(
																	_user$project$Msg$SetSocialField(_user$project$Model_ModelFormType$SocialFormDraft)),
																_1: {ctor: '[]'}
															}
														}
													},
													{ctor: '[]'}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											_user$project$Msg$ItemCreate(
												_user$project$Model_ModelDataType$SocialDataFormType(model.socialForm))),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Submit'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Social_FormComponent$productTable(model),
				_1: {
					ctor: '::',
					_0: A3(_user$project$Component_Social_FormComponent$socialForm, model, model.socialForm, model.socialFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Component_Social_ShowComponent$showComponent = function (social) {
	return A2(
		_elm_lang$html$Html$ul,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(_user$project$Helper_FormHelper$showListItem, 'display_name', social.display_name),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Helper_FormHelper$showListItem, 'description', social.description),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Helper_FormHelper$showListItem, 'tags', social.tags),
					_1: {
						ctor: '::',
						_0: A2(
							_user$project$Helper_FormHelper$showListItem,
							'schedule_date',
							_user$project$Helper_ViewHelper$scheduleDateToString(social.schedule_date)),
						_1: {
							ctor: '::',
							_0: A2(_user$project$Helper_FormHelper$showListItem, 'facebook_code', social.facebook_code),
							_1: {
								ctor: '::',
								_0: A2(_user$project$Helper_FormHelper$showListItem, 'featured_image', social.featured_image),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Helper_FormHelper$showListItem, 'url', social.url),
									_1: {
										ctor: '::',
										_0: A2(_user$project$Helper_FormHelper$showListItem, 'image_caption', social.image_caption),
										_1: {
											ctor: '::',
											_0: A2(_user$project$Helper_FormHelper$showListItem, 'social_media_type', social.social_media_type),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$Component_Social_ShowComponent$showSocialComponent = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Show Post'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Social_ShowComponent$showComponent(_p1._0.individualSocial),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Tags_FormComponent$tagFormField = F5(
	function (form_type, label_text, field_value, validation_value, tag_form) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								form_class.component,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(form_class.input),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(
											_user$project$Msg$SetTagsField(tag_form)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onBlur(_user$project$Msg$OnBlurCheckTagFormValidation),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$value(field_value),
												_1: {ctor: '[]'}
											}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _user$project$Helper_FormHelper$showValidation(
							A2(_elm_lang$core$Maybe$withDefault, _user$project$Helper_FormHelper$noValidation, validation_value)),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$Component_Tags_FormComponent$tagForm = F3(
	function (model, tagForm, tagFormValidation) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('columns'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('column'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A5(
							_user$project$Component_Tags_FormComponent$tagFormField,
							_user$project$Helper_FormHelper$Input,
							'Display Name',
							tagForm.display_name,
							_elm_lang$core$Maybe$Just(tagFormValidation.display_name),
							_user$project$Model_ModelFormType$TagFormDisplayName),
						_1: {
							ctor: '::',
							_0: A5(
								_user$project$Component_Tags_FormComponent$tagFormField,
								_user$project$Helper_FormHelper$TextArea,
								'Description',
								tagForm.description,
								_elm_lang$core$Maybe$Just(tagFormValidation.description),
								_user$project$Model_ModelFormType$TagFormDescription),
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			});
	});
var _user$project$Component_Tags_FormComponent$newTagsTableRow = function (tag) {
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(tag.display_name),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(
								_elm_lang$core$List$length(tag.products))),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_Tags_FormComponent$newTagsTable = function (model) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Helper_TableHelper$tableHeadGenerator(
				{
					ctor: '::',
					_0: 'Tag',
					_1: {
						ctor: '::',
						_0: 'Products',
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(_elm_lang$core$List$map, _user$project$Component_Tags_FormComponent$newTagsTableRow, model.tagAssocList)),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Tags_EditComponent$editTagsComponent = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Edit Tag'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									A2(
										_user$project$Msg$ItemUpdate,
										_user$project$Model_ModelDataType$TagDataFormType(_p2.tagForm),
										_p1._1)),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Submit'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Tags_FormComponent$newTagsTable(_p2),
				_1: {
					ctor: '::',
					_0: A3(_user$project$Component_Tags_FormComponent$tagForm, _p2, _p2.tagForm, _p2.tagFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Component_Tags_IndexComponent$indexTagsRow = F4(
	function (acronym, websiteType, websiteAction, tag) {
		return A2(
			_elm_lang$html$Html$tr,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$align('middle'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(tag.display_name),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$align('middle'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(tag.description),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$align('middle'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$a,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$href(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'#websites/',
												A2(
													_elm_lang$core$Basics_ops['++'],
													acronym,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'/',
														A2(
															_elm_lang$core$Basics_ops['++'],
															websiteType,
															A2(_elm_lang$core$Basics_ops['++'], '/show/', tag.id)))))),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(
												_user$project$Msg$PopulateIndividual(
													_user$project$Model_ModelDataType$TagDataViewType(tag))),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('show'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$align('middle'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$a,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$href(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'#websites/',
													A2(
														_elm_lang$core$Basics_ops['++'],
														acronym,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'/',
															A2(
																_elm_lang$core$Basics_ops['++'],
																websiteType,
																A2(_elm_lang$core$Basics_ops['++'], '/edit/', tag.id)))))),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(
													_user$project$Msg$PopulateForm(
														_user$project$Model_ModelDataType$TagDataFormType(
															_user$project$Helper_ConvertHelper$tagAssocToTagForm(tag)))),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('edit'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$align('middle'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$a,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$href(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'#websites/',
														A2(
															_elm_lang$core$Basics_ops['++'],
															acronym,
															A2(
																_elm_lang$core$Basics_ops['++'],
																'/',
																A2(_elm_lang$core$Basics_ops['++'], websiteType, '/index'))))),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onClick(
														A2(_user$project$Msg$ItemDelete, 'tags', tag.id)),
													_1: {ctor: '[]'}
												}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('delete'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			});
	});
var _user$project$Component_Tags_IndexComponent$indexTagsTable = function (model) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Helper_TableHelper$tableHeadGenerator(
				{
					ctor: '::',
					_0: 'display_name',
					_1: {
						ctor: '::',
						_0: 'description',
						_1: {
							ctor: '::',
							_0: 'show',
							_1: {
								ctor: '::',
								_0: 'edit',
								_1: {
									ctor: '::',
									_0: 'delete',
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(
						_elm_lang$core$List$map,
						A3(_user$project$Component_Tags_IndexComponent$indexTagsRow, model.routeAcronym, model.routeType, model.routeAction),
						model.tagAssocList)),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_Tags_IndexComponent$indexTagsComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Tags Index'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Tags_IndexComponent$indexTagsTable(model),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Tags_NewComponent$newTagsComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('New Tag'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									_user$project$Msg$ItemCreate(
										_user$project$Model_ModelDataType$TagDataFormType(model.tagForm))),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Submit'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Tags_FormComponent$newTagsTable(model),
				_1: {
					ctor: '::',
					_0: A3(_user$project$Component_Tags_FormComponent$tagForm, model, model.tagForm, model.tagFormValidation),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Component_Tags_ShowComponent$showComponent = function (tag) {
	return A2(
		_elm_lang$html$Html$ul,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(_user$project$Helper_FormHelper$showListItem, 'id', tag.id),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Helper_FormHelper$showListItem, 'name', tag.name),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Helper_FormHelper$showListItem, 'display_name', tag.display_name),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Helper_FormHelper$showListItem, 'description', tag.description),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _user$project$Component_Tags_ShowComponent$showTagsComponent = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Show Tag'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Tags_ShowComponent$showComponent(_p1._0.individualTag),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Updates_FormComponent$updateFormField = F5(
	function (form_type, label_text, field_value, validation_value, update_form) {
		var form_class = _user$project$Helper_FormHelper$convertFormType(form_type);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(form_class.field),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label_text),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('control'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								form_class.component,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class(form_class.input),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(
											_user$project$Msg$SetUpdatesField(update_form)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onBlur(_user$project$Msg$OnBlurCheckUpdateFormValidation),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$value(field_value),
												_1: {ctor: '[]'}
											}
										}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _user$project$Helper_FormHelper$showValidation(
							A2(_elm_lang$core$Maybe$withDefault, _user$project$Helper_FormHelper$noValidation, validation_value)),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$Component_Updates_FormComponent$updateForm = F3(
	function (model, update, validation) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('columns'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('column'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A5(
							_user$project$Component_Updates_FormComponent$updateFormField,
							_user$project$Helper_FormHelper$Input,
							'Display Name',
							update.display_name,
							_elm_lang$core$Maybe$Just(validation.display_name),
							_user$project$Model_ModelFormType$UpdateFormDisplayName),
						_1: {
							ctor: '::',
							_0: A5(
								_user$project$Component_Updates_FormComponent$updateFormField,
								_user$project$Helper_FormHelper$Input,
								'Title',
								update.title,
								_elm_lang$core$Maybe$Just(validation.title),
								_user$project$Model_ModelFormType$UpdateFormTitle),
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('column'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A5(
								_user$project$Component_Updates_FormComponent$updateFormField,
								_user$project$Helper_FormHelper$TextArea,
								'Excerpt',
								update.excerpt,
								_elm_lang$core$Maybe$Just(validation.excerpt),
								_user$project$Model_ModelFormType$UpdateFormExcerpt),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			});
	});

var _user$project$Component_Updates_EditComponent$editUpdatesComponent = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Edit Update'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('field'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$label,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('label'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Schedule Date'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$map,
										_user$project$Msg$ToDatePicker,
										A3(_elm_community$elm_datepicker$DatePicker$view, _p2.date, _elm_community$elm_datepicker$DatePicker$defaultSettings, _p2.datePicker)),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('field'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$label,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('label'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Draft'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('control'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$input,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('checkbox'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
															_1: {ctor: '[]'}
														}
													},
													{ctor: '[]'}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											A2(
												_user$project$Msg$ItemUpdate,
												_user$project$Model_ModelDataType$UpdateDataFormType(_p2.updateForm),
												_p1._1)),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Submit'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A3(_user$project$Component_Updates_FormComponent$updateForm, _p2, _p2.updateForm, _p2.updateFormValidation),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Updates_IndexComponent$indexUpdateRow = F4(
	function (acronym, websiteType, websiteAction, update) {
		return A2(
			_elm_lang$html$Html$tr,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$align('middle'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(update.display_name),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$align('middle'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(update.title),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$align('middle'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$a,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$href(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'#websites/',
												A2(
													_elm_lang$core$Basics_ops['++'],
													acronym,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'/',
														A2(
															_elm_lang$core$Basics_ops['++'],
															websiteType,
															A2(_elm_lang$core$Basics_ops['++'], '/show/', update.id)))))),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(
												_user$project$Msg$PopulateIndividual(
													_user$project$Model_ModelDataType$UpdateDataViewType(update))),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('show'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$align('middle'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$a,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$href(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'#websites/',
													A2(
														_elm_lang$core$Basics_ops['++'],
														acronym,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'/',
															A2(
																_elm_lang$core$Basics_ops['++'],
																websiteType,
																A2(_elm_lang$core$Basics_ops['++'], '/edit/', update.id)))))),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(
													_user$project$Msg$PopulateForm(
														_user$project$Model_ModelDataType$UpdateDataFormType(
															_user$project$Helper_ConvertHelper$updateToUpdateForm(update)))),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('edit'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$align('middle'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$a,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$href(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'#websites/',
														A2(
															_elm_lang$core$Basics_ops['++'],
															acronym,
															A2(
																_elm_lang$core$Basics_ops['++'],
																'/',
																A2(_elm_lang$core$Basics_ops['++'], websiteType, '/index'))))),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onClick(
														A2(_user$project$Msg$ItemDelete, 'updates', update.id)),
													_1: {ctor: '[]'}
												}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('delete'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			});
	});
var _user$project$Component_Updates_IndexComponent$indexUpdateTable = function (model) {
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$Helper_TableHelper$tableHeadGenerator(
				{
					ctor: '::',
					_0: 'display_name',
					_1: {
						ctor: '::',
						_0: 'title',
						_1: {
							ctor: '::',
							_0: 'show',
							_1: {
								ctor: '::',
								_0: 'edit',
								_1: {
									ctor: '::',
									_0: 'delete',
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(
						_elm_lang$core$List$map,
						A3(_user$project$Component_Updates_IndexComponent$indexUpdateRow, model.routeAcronym, model.routeType, model.routeAction),
						model.updateList)),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Component_Updates_IndexComponent$indexUpdatesComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Update Index'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Updates_IndexComponent$indexUpdateTable(model),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Updates_NewComponent$newUpdatesComponent = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('New Update'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('field'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$label,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('label'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Schedule Date'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$map,
										_user$project$Msg$ToDatePicker,
										A3(_elm_community$elm_datepicker$DatePicker$view, model.date, _elm_community$elm_datepicker$DatePicker$defaultSettings, model.datePicker)),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('field'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$label,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('label'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Draft'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('control'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$input,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('checkbox'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
															_1: {ctor: '[]'}
														}
													},
													{ctor: '[]'}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											_user$project$Msg$ItemCreate(
												_user$project$Model_ModelDataType$UpdateDataFormType(model.updateForm))),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('button is-primary'),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Submit'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A3(_user$project$Component_Updates_FormComponent$updateForm, model, model.updateForm, model.updateFormValidation),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Updates_ShowComponent$showComponent = function (update) {
	return A2(
		_elm_lang$html$Html$ul,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(_user$project$Helper_FormHelper$showListItem, 'display_name', update.display_name),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Helper_FormHelper$showListItem, 'title', update.title),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Helper_FormHelper$showListItem, 'excerpt', update.excerpt),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Helper_FormHelper$showListItem, 'author', update.author),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _user$project$Component_Updates_ShowComponent$showUpdatesComponent = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main__component__top'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Show Post'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Component_Updates_ShowComponent$showComponent(_p1._0.individualUpdate),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Component_Websites_MainComponent$noneModelShowEdit = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('nada'),
			_1: {ctor: '[]'}
		});
};
var _user$project$Component_Websites_MainComponent$noneModel = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('nada'),
			_1: {ctor: '[]'}
		});
};
var _user$project$Component_Websites_MainComponent$notFoundView = A2(
	_elm_lang$html$Html$div,
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _elm_lang$html$Html$text('Not found'),
		_1: {ctor: '[]'}
	});
var _user$project$Component_Websites_MainComponent$maybeHtmlMsgShowEdit = function (html) {
	var _p2 = html;
	if (_p2.ctor === 'Just') {
		return _p2._0;
	} else {
		return _user$project$Component_Websites_MainComponent$noneModelShowEdit;
	}
};
var _user$project$Component_Websites_MainComponent$maybeHtmlMsg = function (html) {
	var _p3 = html;
	if (_p3.ctor === 'Just') {
		return _p3._0;
	} else {
		return _user$project$Component_Websites_MainComponent$noneModel;
	}
};
var _user$project$Component_Websites_MainComponent$websitesMainPageShowEditDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: 'products', _1: 'edit'},
			_1: _user$project$Component_Products_EditComponent$editProductsComponent
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: 'products', _1: 'show'},
				_1: _user$project$Component_Products_ShowComponent$showProductsComponent
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 'posts', _1: 'edit'},
					_1: _user$project$Component_Posts_EditComponent$editPostsComponent
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: 'posts', _1: 'show'},
						_1: _user$project$Component_Posts_ShowComponent$showPostsComponent
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 'social', _1: 'edit'},
							_1: _user$project$Component_Social_EditComponent$editSocialComponent
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: {ctor: '_Tuple2', _0: 'social', _1: 'show'},
								_1: _user$project$Component_Social_ShowComponent$showSocialComponent
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: {ctor: '_Tuple2', _0: 'tags', _1: 'edit'},
									_1: _user$project$Component_Tags_EditComponent$editTagsComponent
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: {ctor: '_Tuple2', _0: 'tags', _1: 'show'},
										_1: _user$project$Component_Tags_ShowComponent$showTagsComponent
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: {ctor: '_Tuple2', _0: 'updates', _1: 'edit'},
											_1: _user$project$Component_Updates_EditComponent$editUpdatesComponent
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: {ctor: '_Tuple2', _0: 'updates', _1: 'show'},
												_1: _user$project$Component_Updates_ShowComponent$showUpdatesComponent
											},
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$Component_Websites_MainComponent$websitesMainPageDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: 'products', _1: 'index'},
			_1: _user$project$Component_Products_IndexComponent$indexProductsComponent
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: 'products', _1: 'new'},
				_1: _user$project$Component_Products_NewComponent$newProductsComponent
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 'posts', _1: 'index'},
					_1: _user$project$Component_Posts_IndexComponent$indexPostsComponent
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: 'posts', _1: 'new'},
						_1: _user$project$Component_Posts_NewComponent$newPostsComponent
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 'social', _1: 'index'},
							_1: _user$project$Component_Social_IndexComponent$indexSocialComponent
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: {ctor: '_Tuple2', _0: 'social', _1: 'new'},
								_1: _user$project$Component_Social_NewComponent$newSocialComponent
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: {ctor: '_Tuple2', _0: 'tags', _1: 'index'},
									_1: _user$project$Component_Tags_IndexComponent$indexTagsComponent
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: {ctor: '_Tuple2', _0: 'tags', _1: 'new'},
										_1: _user$project$Component_Tags_NewComponent$newTagsComponent
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: {ctor: '_Tuple2', _0: 'updates', _1: 'index'},
											_1: _user$project$Component_Updates_IndexComponent$indexUpdatesComponent
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: {ctor: '_Tuple2', _0: 'updates', _1: 'new'},
												_1: _user$project$Component_Updates_NewComponent$newUpdatesComponent
											},
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$Component_Websites_MainComponent$websitesMainPage = F5(
	function (model, acronym, websiteType, websiteAction, itemId) {
		var _p4 = itemId;
		if (_p4 === 'null') {
			return _user$project$Component_Websites_MainComponent$maybeHtmlMsg(
				A2(
					_elm_lang$core$Dict$get,
					{ctor: '_Tuple2', _0: websiteType, _1: websiteAction},
					_user$project$Component_Websites_MainComponent$websitesMainPageDictionary))(model);
		} else {
			return _user$project$Component_Websites_MainComponent$maybeHtmlMsgShowEdit(
				A2(
					_elm_lang$core$Dict$get,
					{ctor: '_Tuple2', _0: websiteType, _1: websiteAction},
					_user$project$Component_Websites_MainComponent$websitesMainPageShowEditDictionary))(
				{ctor: '_Tuple2', _0: model, _1: itemId});
		}
	});
var _user$project$Component_Websites_MainComponent$websitesNavbarItemDropdown = F3(
	function (acronym, url, navbarWebsitesItem) {
		return A2(
			_elm_lang$html$Html$a,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('navbar-item'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$href(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'#websites/',
							A2(
								_elm_lang$core$Basics_ops['++'],
								acronym,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'/',
									A2(
										_elm_lang$core$Basics_ops['++'],
										url,
										A2(_elm_lang$core$Basics_ops['++'], '/', navbarWebsitesItem.action)))))),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(navbarWebsitesItem.name),
				_1: {ctor: '[]'}
			});
	});
var _user$project$Component_Websites_MainComponent$websitesNavbarItem = function (websitesNavbarItem) {
	var _p5 = websitesNavbarItem.main;
	if (_p5 === 'pending') {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('navbar-item is-hoverable'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$a,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('navbar-link'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$href(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'#websites/',
									A2(
										_elm_lang$core$Basics_ops['++'],
										websitesNavbarItem.acronym,
										A2(
											_elm_lang$core$Basics_ops['++'],
											'/',
											A2(_elm_lang$core$Basics_ops['++'], websitesNavbarItem.url, '/new'))))),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(websitesNavbarItem.main),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	} else {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('navbar-item has-dropdown is-hoverable'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$a,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('navbar-link'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$href(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'#websites/',
									A2(
										_elm_lang$core$Basics_ops['++'],
										websitesNavbarItem.acronym,
										A2(
											_elm_lang$core$Basics_ops['++'],
											'/',
											A2(_elm_lang$core$Basics_ops['++'], websitesNavbarItem.url, '/new'))))),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(websitesNavbarItem.main),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('navbar-dropdown'),
							_1: {ctor: '[]'}
						},
						A2(
							_elm_lang$core$List$map,
							A2(_user$project$Component_Websites_MainComponent$websitesNavbarItemDropdown, websitesNavbarItem.acronym, websitesNavbarItem.url),
							websitesNavbarItem.sub)),
					_1: {ctor: '[]'}
				}
			});
	}
};
var _user$project$Component_Websites_MainComponent$websitesNavbar = F3(
	function (websitesMainNavbarItems, websiteAcronym, websiteRoute) {
		var newWebsitesNavbarItem = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _elm_lang$core$Native_Utils.update(
					x,
					{acronym: websiteAcronym});
			},
			websitesMainNavbarItems);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('navbar'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('navbar-menu'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('navbar-start'),
								_1: {ctor: '[]'}
							},
							A2(_elm_lang$core$List$map, _user$project$Component_Websites_MainComponent$websitesNavbarItem, newWebsitesNavbarItem)),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	});
var _user$project$Component_Websites_MainComponent$websitesComponent = F5(
	function (model, acronym, websiteType, websiteAction, itemId) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A3(_user$project$Component_Websites_MainComponent$websitesNavbar, model.websitesMainNavbarItems, acronym, websiteType),
				_1: {
					ctor: '::',
					_0: A5(_user$project$Component_Websites_MainComponent$websitesMainPage, model, acronym, websiteType, websiteAction, itemId),
					_1: {ctor: '[]'}
				}
			});
	});

var _user$project$Helper_DataEmptyHelper$emptyScheduleDate = {day: 1, month: 1, year: 2018};
var _user$project$Helper_DataEmptyHelper$emptyUpdateForm = {display_name: '', title: '', excerpt: '', author: 'Julius Reade', schedule_date: _user$project$Helper_DataEmptyHelper$emptyScheduleDate, draft: false};
var _user$project$Helper_DataEmptyHelper$emptyUpdate = {id: '', name: '', display_name: '', title: '', excerpt: '', author: '', schedule_date: _user$project$Helper_DataEmptyHelper$emptyScheduleDate, draft: false};
var _user$project$Helper_DataEmptyHelper$emptyTagForm = {display_name: '', description: ''};
var _user$project$Helper_DataEmptyHelper$emptyTag = {id: '', name: '', display_name: '', description: ''};
var _user$project$Helper_DataEmptyHelper$emptyTagAssoc = {
	id: '',
	name: '',
	display_name: '',
	description: '',
	posts: {ctor: '[]'},
	products: {ctor: '[]'}
};
var _user$project$Helper_DataEmptyHelper$emptyCategory = {id: '', name: '', display_name: '', description: '', icon: ''};
var _user$project$Helper_DataEmptyHelper$emptySocialForm = {display_name: '', description: '', tags: '', draft: false, schedule_date: _user$project$Helper_DataEmptyHelper$emptyScheduleDate, facebook_code: '', featured_image: '', url: '', image_caption: '', social_media_type: ''};
var _user$project$Helper_DataEmptyHelper$emptySocial = {id: '', name: '', display_name: '', description: '', tags: '', draft: false, schedule_date: _user$project$Helper_DataEmptyHelper$emptyScheduleDate, facebook_code: '', featured_image: '', url: '', image_caption: '', social_media_type: ''};
var _user$project$Helper_DataEmptyHelper$emptyPostForm = {
	author: 'Julius Reade',
	display_name: '',
	excerpt: '',
	featured_image: '',
	post_type: 'product_list',
	product_limit: _elm_lang$core$Maybe$Just(10),
	product_offset: _elm_lang$core$Maybe$Just(0),
	tag: _elm_lang$core$Maybe$Just(_user$project$Helper_DataEmptyHelper$emptyTag)
};
var _user$project$Helper_DataEmptyHelper$emptyPost = {
	id: '',
	name: '',
	display_name: '',
	author: 'Julius Reade',
	excerpt: '',
	featured_image: '',
	post_type: 'product_list',
	product_limit: _elm_lang$core$Maybe$Just(10),
	product_offset: _elm_lang$core$Maybe$Just(0)
};
var _user$project$Helper_DataEmptyHelper$emptyPostAssoc = {
	id: '',
	name: '',
	display_name: '',
	author: 'Julius Reade',
	excerpt: '',
	featured_image: '',
	post_type: 'product_list',
	tag: _elm_lang$core$Maybe$Just(_user$project$Helper_DataEmptyHelper$emptyTag),
	product_limit: _elm_lang$core$Maybe$Just(10),
	product_offset: _elm_lang$core$Maybe$Just(0)
};
var _user$project$Helper_DataEmptyHelper$emptyProductForm = {
	display_name: '',
	description: '',
	blog_description: '',
	original_featured_image: '',
	featured_image: '',
	draft: false,
	schedule_date: _user$project$Helper_DataEmptyHelper$emptyScheduleDate,
	cta: 'Save',
	price: 0.0,
	url: '',
	url_text: '',
	category: _user$project$Helper_DataEmptyHelper$emptyCategory,
	category_id: '',
	tag_id: {ctor: '[]'},
	product_like: 0,
	product_type: 'general'
};
var _user$project$Helper_DataEmptyHelper$emptyBuildForm = {website_acronym: 'ac', website_lower: 'christmas', website_capital: 'Christmas', num_of_categories: '6', c1_name: 'toys', c1_display_name: 'Toys', c1_model: 'Toys', c1_icon: 'fa-none', c2_name: 'fashion', c2_display_name: 'Fashion', c2_model: 'Fashion', c2_icon: 'fae-shirt', c3_name: 'video-games', c3_display_name: 'Videogames', c3_model: 'VideoGames', c3_icon: 'fa-90s-n64', c4_name: 'home-office', c4_display_name: 'Home & Office', c4_model: 'HomeOffice', c4_icon: 'fa-home', c5_name: 'sports-outdoors', c5_display_name: 'Sports Outdoors', c5_model: 'SportsOutdoors', c5_icon: 'fae-sun-cloud', c6_name: 'food', c6_display_name: 'Food', c6_model: 'Food', c6_icon: 'fae-pizza', c7_name: 'wtf', c7_display_name: 'WTF', c7_model: 'WTF', c7_icon: 'fa-bomb'};
var _user$project$Helper_DataEmptyHelper$emptyConfigEnvData = {website_acronym: '', website_name: '', website_name_lower: '', website_domain: '', website_logo_png: '', website_logo_svg: '', website_favicon: '', website_title: '', website_description: '', website_keywords: '', website_twitter: '', website_alt_image: '', blog_meta_description: '', categories_meta_description: '', updates_meta_description: '', about_meta_description: '', contact_meta_description: '', submit_meta_description: '', login_meta_description: '', register_meta_description: '', search_meta_description: '', about_copy: '', submit_copy: '', letter_copy: '', google_analytics_tracking_id: '', google_site_verification: '', primary_email: '', password: ''};
var _user$project$Helper_DataEmptyHelper$emptyProductAssoc = {
	id: '',
	name: '',
	display_name: '',
	description: '',
	blog_description: '',
	featured_image: '',
	schedule_date: _user$project$Helper_DataEmptyHelper$emptyScheduleDate,
	draft: false,
	cta: '',
	price: 0.0,
	product_type: '',
	url: '',
	url_text: '',
	inserted_at: '',
	category: {id: '', name: '', display_name: '', description: '', icon: ''},
	product_tags: {ctor: '[]'},
	product_like: {id: '', total: 0}
};
var _user$project$Helper_DataEmptyHelper$emptyIndividualEnvData = {mailgun_domain: '', amazon_s3_bucket_name: '', recaptcha_public_key: '', recaptcha_private_key: '', twitter_api_key: '', twitter_secret_key: '', twitter_access_token: '', twitter_access_token_secret: '', facebook_api_key: '', facebook_secret_key: '', facebook_page_id: '', facebook_redirect_url: '', tumblr_api_key: '', tumblr_secret_key: '', tumblr_blog_identifier: '', pintrest_api_key: '', pintrest_secret_key: ''};
var _user$project$Helper_DataEmptyHelper$emptyCommonEnvData = {mailgun_key: '', amazon_associate_tag: '', aws_access_key_id: '', aws_secret_access_key: '', marketplace_host: '', amazon_s3_access_key: '', amazon_s3_secret_access_key: '', etsy_api_key: '', etsy_secret_key: '', tumblr_access_token: '', tumblr_access_token_secret: ''};
var _user$project$Helper_DataEmptyHelper$tagIdValidation = {isEmpty: false, validationMessage: 'Please select tag values', validationType: _user$project$Model_ModelValidation$StringValidation};
var _user$project$Helper_DataEmptyHelper$boolValidation = {isEmpty: false, validationMessage: 'Please provide checkbox value', validationType: _user$project$Model_ModelValidation$BoolValidation};
var _user$project$Helper_DataEmptyHelper$floatValidation = {isEmpty: false, validationMessage: 'Please input a float value', validationType: _user$project$Model_ModelValidation$FloatValidation};
var _user$project$Helper_DataEmptyHelper$intValidation = {isEmpty: false, validationMessage: 'Please input a number value', validationType: _user$project$Model_ModelValidation$IntValidation};
var _user$project$Helper_DataEmptyHelper$stringValidation = {isEmpty: false, validationMessage: 'Please input a text value', validationType: _user$project$Model_ModelValidation$StringValidation};
var _user$project$Helper_DataEmptyHelper$emptyTagIdValidation = {isEmpty: true, validationMessage: 'Please select tag values', validationType: _user$project$Model_ModelValidation$StringValidation};
var _user$project$Helper_DataEmptyHelper$emptyBoolValidation = {isEmpty: true, validationMessage: 'Please provide checkbox value', validationType: _user$project$Model_ModelValidation$BoolValidation};
var _user$project$Helper_DataEmptyHelper$emptyFloatValidation = {isEmpty: true, validationMessage: 'Please input a float value', validationType: _user$project$Model_ModelValidation$FloatValidation};
var _user$project$Helper_DataEmptyHelper$emptyIntValidation = {isEmpty: true, validationMessage: 'Please input a number value', validationType: _user$project$Model_ModelValidation$IntValidation};
var _user$project$Helper_DataEmptyHelper$emptyStringValidation = {isEmpty: true, validationMessage: 'Please input a text value', validationType: _user$project$Model_ModelValidation$StringValidation};
var _user$project$Helper_DataEmptyHelper$emptyBuildFormValidation = {website_acronym: _user$project$Helper_DataEmptyHelper$emptyStringValidation, website_lower: _user$project$Helper_DataEmptyHelper$emptyStringValidation, website_capital: _user$project$Helper_DataEmptyHelper$emptyStringValidation, num_of_categories: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c1_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c1_display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c1_model: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c1_icon: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c2_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c2_display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c2_model: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c2_icon: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c3_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c3_display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c3_model: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c3_icon: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c4_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c4_display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c4_model: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c4_icon: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c5_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c5_display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c5_model: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c5_icon: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c6_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c6_display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c6_model: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c6_icon: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c7_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c7_display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c7_model: _user$project$Helper_DataEmptyHelper$emptyStringValidation, c7_icon: _user$project$Helper_DataEmptyHelper$emptyStringValidation};
var _user$project$Helper_DataEmptyHelper$emptyProductFormValidation = {display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, description: _user$project$Helper_DataEmptyHelper$emptyStringValidation, blog_description: _user$project$Helper_DataEmptyHelper$emptyStringValidation, featured_image: _user$project$Helper_DataEmptyHelper$emptyStringValidation, cta: _user$project$Helper_DataEmptyHelper$stringValidation, price: _user$project$Helper_DataEmptyHelper$emptyFloatValidation, url: _user$project$Helper_DataEmptyHelper$emptyStringValidation, url_text: _user$project$Helper_DataEmptyHelper$emptyStringValidation, tag_id: _user$project$Helper_DataEmptyHelper$emptyTagIdValidation, product_like: _user$project$Helper_DataEmptyHelper$intValidation};
var _user$project$Helper_DataEmptyHelper$emptyPostFormValidation = {author: _user$project$Helper_DataEmptyHelper$stringValidation, display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, excerpt: _user$project$Helper_DataEmptyHelper$emptyStringValidation, featured_image: _user$project$Helper_DataEmptyHelper$emptyStringValidation};
var _user$project$Helper_DataEmptyHelper$emptySocialFormValidation = {display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, description: _user$project$Helper_DataEmptyHelper$emptyStringValidation, tags: _user$project$Helper_DataEmptyHelper$emptyStringValidation, featured_image: _user$project$Helper_DataEmptyHelper$emptyStringValidation, url: _user$project$Helper_DataEmptyHelper$emptyStringValidation, image_caption: _user$project$Helper_DataEmptyHelper$emptyStringValidation};
var _user$project$Helper_DataEmptyHelper$emptyTagFormValidation = {display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, description: _user$project$Helper_DataEmptyHelper$emptyStringValidation};
var _user$project$Helper_DataEmptyHelper$emptyUpdateFormValidation = {display_name: _user$project$Helper_DataEmptyHelper$emptyStringValidation, title: _user$project$Helper_DataEmptyHelper$emptyStringValidation, excerpt: _user$project$Helper_DataEmptyHelper$emptyStringValidation, author: _user$project$Helper_DataEmptyHelper$stringValidation};

var _user$project$Helper_DataNavbarHelper$commandsList = {
	ctor: '::',
	_0: {name: 'DUR', key: 'DR', script: 'dur_all', command: _user$project$Model_ModelDevelopment$DUR, commandType: _user$project$Model_ModelDevelopment$Development},
	_1: {
		ctor: '::',
		_0: {name: 'Durc All', key: 'DC', script: 'durc_all', command: _user$project$Model_ModelDevelopment$DURC, commandType: _user$project$Model_ModelDevelopment$Development},
		_1: {
			ctor: '::',
			_0: {name: 'Compile All', key: 'CA', script: 'compile_all', command: _user$project$Model_ModelDevelopment$CompileAll, commandType: _user$project$Model_ModelDevelopment$Development},
			_1: {
				ctor: '::',
				_0: {name: 'Compile Single', key: 'CS', script: 'compile_single', command: _user$project$Model_ModelDevelopment$CompileSingle, commandType: _user$project$Model_ModelDevelopment$Development},
				_1: {
					ctor: '::',
					_0: {name: 'Delete All', key: 'DA', script: 'delete_all', command: _user$project$Model_ModelDevelopment$DeleteAll, commandType: _user$project$Model_ModelDevelopment$Development},
					_1: {
						ctor: '::',
						_0: {name: 'Delete Single', key: 'DS', script: 'delete_single', command: _user$project$Model_ModelDevelopment$DeleteSingle, commandType: _user$project$Model_ModelDevelopment$Development},
						_1: {
							ctor: '::',
							_0: {name: 'Ecto Create All', key: 'EA', script: 'ecto_create_all', command: _user$project$Model_ModelDevelopment$EctoCreateAll, commandType: _user$project$Model_ModelDevelopment$Development},
							_1: {
								ctor: '::',
								_0: {name: 'Ecto Migrate All', key: 'EM', script: 'ecto_migrate_all', command: _user$project$Model_ModelDevelopment$EctoMigrateAll, commandType: _user$project$Model_ModelDevelopment$Development},
								_1: {
									ctor: '::',
									_0: {name: 'Ecto Reset All', key: 'ER', script: 'ecto_reset_all', command: _user$project$Model_ModelDevelopment$EctoResetAll, commandType: _user$project$Model_ModelDevelopment$Development},
									_1: {
										ctor: '::',
										_0: {name: 'Update All', key: 'UA', script: 'update_all', command: _user$project$Model_ModelDevelopment$UpdateAll, commandType: _user$project$Model_ModelDevelopment$Development},
										_1: {
											ctor: '::',
											_0: {name: 'Update Single', key: 'US', script: 'update_single', command: _user$project$Model_ModelDevelopment$UpdateSingle, commandType: _user$project$Model_ModelDevelopment$Development},
											_1: {
												ctor: '::',
												_0: {name: 'Pull All', key: 'PL', script: 'pull_all', command: _user$project$Model_ModelDevelopment$PullAll, commandType: _user$project$Model_ModelDevelopment$Production},
												_1: {
													ctor: '::',
													_0: {name: 'Pull Single', key: 'PS', script: 'pull_single', command: _user$project$Model_ModelDevelopment$PullSingle, commandType: _user$project$Model_ModelDevelopment$Production},
													_1: {
														ctor: '::',
														_0: {name: 'Push All', key: 'PA', script: 'push_all', command: _user$project$Model_ModelDevelopment$PushAll, commandType: _user$project$Model_ModelDevelopment$Development},
														_1: {
															ctor: '::',
															_0: {name: 'Push Single', key: 'PI', script: 'push_single', command: _user$project$Model_ModelDevelopment$PushSingle, commandType: _user$project$Model_ModelDevelopment$Development},
															_1: {
																ctor: '::',
																_0: {name: 'Push Awful Manager', key: 'PM', script: 'push_awful_manager', command: _user$project$Model_ModelDevelopment$PushAwfulManager, commandType: _user$project$Model_ModelDevelopment$Development},
																_1: {
																	ctor: '::',
																	_0: {name: 'Seed All', key: 'SA', script: 'seed_all', command: _user$project$Model_ModelDevelopment$SeedAll, commandType: _user$project$Model_ModelDevelopment$Development},
																	_1: {
																		ctor: '::',
																		_0: {name: 'Seed Single', key: 'SI', script: 'seed_single', command: _user$project$Model_ModelDevelopment$SeedSingle, commandType: _user$project$Model_ModelDevelopment$Development},
																		_1: {
																			ctor: '::',
																			_0: {name: 'Source All', key: 'OA', script: 'source_all', command: _user$project$Model_ModelDevelopment$SourceAll, commandType: _user$project$Model_ModelDevelopment$Production},
																			_1: {
																				ctor: '::',
																				_0: {name: 'Source Single', key: 'OI', script: 'source_single', command: _user$project$Model_ModelDevelopment$SourceSingle, commandType: _user$project$Model_ModelDevelopment$Production},
																				_1: {
																					ctor: '::',
																					_0: {name: 'Transfer Images', key: 'TI', script: 'transfer_images', command: _user$project$Model_ModelDevelopment$TransferImages, commandType: _user$project$Model_ModelDevelopment$Development},
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$Helper_DataNavbarHelper$websitesMainNavbarItems = {
	ctor: '::',
	_0: {
		main: 'Product',
		url: 'products',
		acronym: '',
		sub: {
			ctor: '::',
			_0: {name: 'Index Product', action: 'index'},
			_1: {
				ctor: '::',
				_0: {name: 'New Product', action: 'new'},
				_1: {ctor: '[]'}
			}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			main: 'Post',
			url: 'posts',
			acronym: '',
			sub: {
				ctor: '::',
				_0: {name: 'Index Post', action: 'index'},
				_1: {
					ctor: '::',
					_0: {name: 'New Post', action: 'new'},
					_1: {ctor: '[]'}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				main: 'Social',
				url: 'social',
				acronym: '',
				sub: {
					ctor: '::',
					_0: {name: 'Index Social', action: 'index'},
					_1: {
						ctor: '::',
						_0: {name: 'New Social', action: 'new'},
						_1: {ctor: '[]'}
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					main: 'Tag',
					url: 'tags',
					acronym: '',
					sub: {
						ctor: '::',
						_0: {name: 'Index Tag', action: 'index'},
						_1: {
							ctor: '::',
							_0: {name: 'New Tag', action: 'new'},
							_1: {ctor: '[]'}
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						main: 'Update',
						url: 'updates',
						acronym: '',
						sub: {
							ctor: '::',
							_0: {name: 'Index Update', action: 'index'},
							_1: {
								ctor: '::',
								_0: {name: 'New Update', action: 'new'},
								_1: {ctor: '[]'}
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							main: 'Pending',
							url: 'pending',
							acronym: '',
							sub: {ctor: '[]'}
						},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _user$project$Helper_DataNavbarHelper$navbarWebsiteItems = {
	ctor: '::',
	_0: {name: 'awful christmas', acronym: 'ac/products/new'},
	_1: {
		ctor: '::',
		_0: {name: 'awful fashion', acronym: 'af/products/new'},
		_1: {
			ctor: '::',
			_0: {name: 'awful pet', acronym: 'ap/products/new'},
			_1: {
				ctor: '::',
				_0: {name: 'awful child', acronym: 'ach/products/new'},
				_1: {
					ctor: '::',
					_0: {name: 'awful pokemon', acronym: 'apo/products/new'},
					_1: {
						ctor: '::',
						_0: {name: 'awful harry potter', acronym: 'ahp/products/new'},
						_1: {
							ctor: '::',
							_0: {name: 'awful 90s', acronym: 'a9/products/new'},
							_1: {
								ctor: '::',
								_0: {name: 'awful wedding', acronym: 'aw/products/new'},
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$Helper_DataNavbarHelper$navbarItems = {
	ctor: '::',
	_0: {main: 'overview', route: _user$project$Model_ModelRouting$OverviewRoute, sub: _user$project$Helper_DataNavbarHelper$navbarWebsiteItems},
	_1: {
		ctor: '::',
		_0: {
			main: 'development',
			route: _user$project$Model_ModelRouting$DevelopmentRoute,
			sub: {ctor: '[]'}
		},
		_1: {
			ctor: '::',
			_0: {
				main: 'build',
				route: _user$project$Model_ModelRouting$BuildRoute,
				sub: {ctor: '[]'}
			},
			_1: {
				ctor: '::',
				_0: {
					main: 'config',
					route: _user$project$Model_ModelRouting$ConfigRoute,
					sub: {ctor: '[]'}
				},
				_1: {ctor: '[]'}
			}
		}
	}
};

var _user$project$Helper_DateHelper$maybeTime = function (time) {
	var _p0 = time;
	if (_p0.ctor === 'Just') {
		var minutes = _elm_lang$core$Time$inMinutes(_p0._0);
		return minutes;
	} else {
		return 0;
	}
};
var _user$project$Helper_DateHelper$dateMonthToInt = function (month) {
	var _p1 = month;
	switch (_p1.ctor) {
		case 'Jan':
			return '01';
		case 'Feb':
			return '02';
		case 'Mar':
			return '03';
		case 'Apr':
			return '04';
		case 'May':
			return '05';
		case 'Jun':
			return '06';
		case 'Jul':
			return '07';
		case 'Aug':
			return '08';
		case 'Sep':
			return '09';
		case 'Oct':
			return '10';
		case 'Nov':
			return '11';
		default:
			return '12';
	}
};
var _user$project$Helper_DateHelper$maybeDate = function (date) {
	var _p2 = date;
	if (_p2.ctor === 'Just') {
		var _p3 = _p2._0;
		var date_year = _elm_lang$core$Basics$toString(
			_elm_lang$core$Date$year(_p3));
		var date_month = _user$project$Helper_DateHelper$dateMonthToInt(
			_elm_lang$core$Date$month(_p3));
		var date_day = _elm_lang$core$Basics$toString(
			_elm_lang$core$Date$day(_p3));
		var date_hour = _elm_lang$core$Basics$toString(
			_elm_lang$core$Date$hour(_p3));
		var date_minute = _elm_lang$core$Basics$toString(
			_elm_lang$core$Date$minute(_p3));
		var date_second = _elm_lang$core$Basics$toString(
			_elm_lang$core$Date$second(_p3));
		return A2(
			_elm_lang$core$Basics_ops['++'],
			date_year,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'-',
				A2(
					_elm_lang$core$Basics_ops['++'],
					date_month,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'-',
						A2(
							_elm_lang$core$Basics_ops['++'],
							date_day,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'  ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									date_hour,
									A2(_elm_lang$core$Basics_ops['++'], ':', date_minute))))))));
	} else {
		return 'Date Not Working!';
	}
};
var _user$project$Helper_DateHelper$dateMonthToActualInt = function (month) {
	var _p4 = month;
	switch (_p4.ctor) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};

var _user$project$Model_ModelKeyboard$SubmitData = F2(
	function (a, b) {
		return {submit_type: a, websitesType: b};
	});
var _user$project$Model_ModelKeyboard$SocialFormType = {ctor: 'SocialFormType'};
var _user$project$Model_ModelKeyboard$UpdateFormType = {ctor: 'UpdateFormType'};
var _user$project$Model_ModelKeyboard$TagFormType = {ctor: 'TagFormType'};
var _user$project$Model_ModelKeyboard$PostFormType = {ctor: 'PostFormType'};
var _user$project$Model_ModelKeyboard$ProductFormType = {ctor: 'ProductFormType'};
var _user$project$Model_ModelKeyboard$BuildSubmit = {ctor: 'BuildSubmit'};
var _user$project$Model_ModelKeyboard$EnvSubmit = {ctor: 'EnvSubmit'};
var _user$project$Model_ModelKeyboard$IndividualSubmit = {ctor: 'IndividualSubmit'};
var _user$project$Model_ModelKeyboard$CommonSubmit = {ctor: 'CommonSubmit'};
var _user$project$Model_ModelKeyboard$ProductSearch = {ctor: 'ProductSearch'};
var _user$project$Model_ModelKeyboard$WebsitesSubmit = {ctor: 'WebsitesSubmit'};

var _user$project$Helper_DictionaryHelper$submitDataDoubleDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: 80, _1: 69},
			_1: {
				submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
				websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$ProductFormType)
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: 66, _1: 69},
				_1: {
					submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
					websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$PostFormType)
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 83, _1: 69},
					_1: {
						submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
						websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$SocialFormType)
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: 84, _1: 69},
						_1: {
							submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
							websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$TagFormType)
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 85, _1: 69},
							_1: {
								submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
								websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$UpdateFormType)
							}
						},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	});
var _user$project$Helper_DictionaryHelper$submitDataDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 80,
			_1: {
				submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
				websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$ProductFormType)
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 66,
				_1: {
					submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
					websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$PostFormType)
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 83,
					_1: {
						submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
						websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$SocialFormType)
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 84,
						_1: {
							submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
							websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$TagFormType)
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 85,
							_1: {
								submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
								websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$UpdateFormType)
							}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 75,
								_1: {submit_type: _user$project$Model_ModelKeyboard$ProductSearch, websitesType: _elm_lang$core$Maybe$Nothing}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 67,
									_1: {submit_type: _user$project$Model_ModelKeyboard$CommonSubmit, websitesType: _elm_lang$core$Maybe$Nothing}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 73,
										_1: {submit_type: _user$project$Model_ModelKeyboard$IndividualSubmit, websitesType: _elm_lang$core$Maybe$Nothing}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 69,
											_1: {submit_type: _user$project$Model_ModelKeyboard$EnvSubmit, websitesType: _elm_lang$core$Maybe$Nothing}
										},
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$Helper_DictionaryHelper$uxTupleDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: 80, _1: 73},
			_1: {routeString: 'products/index', name: 'Products Index', routeType: 'products', routeAction: 'index'}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: 80, _1: 78},
				_1: {routeString: 'products/new', name: 'Products New', routeType: 'products', routeAction: 'new'}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 66, _1: 73},
					_1: {routeString: 'posts/index', name: 'Posts Index', routeType: 'posts', routeAction: 'index'}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: 66, _1: 78},
						_1: {routeString: 'posts/new', name: 'Posts New', routeType: 'posts', routeAction: 'new'}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 83, _1: 73},
							_1: {routeString: 'social/index', name: 'Social Index', routeType: 'social', routeAction: 'index'}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: {ctor: '_Tuple2', _0: 83, _1: 78},
								_1: {routeString: 'social/new', name: 'Social New', routeType: 'social', routeAction: 'new'}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: {ctor: '_Tuple2', _0: 84, _1: 73},
									_1: {routeString: 'tags/index', name: 'Tags Index', routeType: 'tags', routeAction: 'index'}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: {ctor: '_Tuple2', _0: 84, _1: 78},
										_1: {routeString: 'tags/new', name: 'Tags New', routeType: 'tags', routeAction: 'new'}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: {ctor: '_Tuple2', _0: 85, _1: 73},
											_1: {routeString: 'updates/index', name: 'Updates Index', routeType: 'updates', routeAction: 'index'}
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: {ctor: '_Tuple2', _0: 85, _1: 78},
												_1: {routeString: 'updates/new', name: 'Updates New', routeType: 'updates', routeAction: 'new'}
											},
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$Helper_DictionaryHelper$uxSingleDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 79,
			_1: {routeString: 'overview', name: 'overview', routeType: '', routeAction: ''}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 68,
				_1: {routeString: 'development', name: 'development', routeType: '', routeAction: ''}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 87,
					_1: {routeString: 'websites', name: 'websites', routeType: '', routeAction: ''}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 66,
						_1: {routeString: 'build', name: 'build', routeType: '', routeAction: ''}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 67,
							_1: {routeString: 'config', name: 'config', routeType: '', routeAction: ''}
						},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	});
var _user$project$Helper_DictionaryHelper$developmentCommandsDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: 68, _1: 82},
			_1: 'dur_all'
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: 68, _1: 67},
				_1: 'durc_all'
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 67, _1: 65},
					_1: 'compile_all'
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: 67, _1: 83},
						_1: 'compile_single'
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 68, _1: 65},
							_1: 'delete_all'
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: {ctor: '_Tuple2', _0: 68, _1: 83},
								_1: 'delete_single'
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: {ctor: '_Tuple2', _0: 69, _1: 65},
									_1: 'ecto_create_all'
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: {ctor: '_Tuple2', _0: 69, _1: 77},
										_1: 'ecto_migrate_all'
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: {ctor: '_Tuple2', _0: 69, _1: 82},
											_1: 'ecto_reset_all'
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: {ctor: '_Tuple2', _0: 85, _1: 65},
												_1: 'update_all'
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: {ctor: '_Tuple2', _0: 85, _1: 83},
													_1: 'update_single'
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: {ctor: '_Tuple2', _0: 80, _1: 76},
														_1: 'pull_all'
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: {ctor: '_Tuple2', _0: 80, _1: 83},
															_1: 'pull_single'
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: {ctor: '_Tuple2', _0: 80, _1: 65},
																_1: 'push_all'
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: {ctor: '_Tuple2', _0: 80, _1: 73},
																	_1: 'push_single'
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: {ctor: '_Tuple2', _0: 80, _1: 77},
																		_1: 'push_awful_manager'
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: {ctor: '_Tuple2', _0: 84, _1: 73},
																			_1: 'transfer_images'
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: {ctor: '_Tuple2', _0: 83, _1: 65},
																				_1: 'seed_all'
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: {ctor: '_Tuple2', _0: 83, _1: 73},
																					_1: 'seed_single'
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: {ctor: '_Tuple2', _0: 79, _1: 65},
																						_1: 'source_all'
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: {ctor: '_Tuple2', _0: 79, _1: 73},
																							_1: 'source_single'
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: {ctor: '_Tuple2', _0: 66, _1: 83},
																								_1: 'build_single'
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: {ctor: '_Tuple2', _0: 83, _1: 83},
																									_1: 'start_single'
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: {ctor: '_Tuple2', _0: 83, _1: 76},
																										_1: 'start_all'
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: {ctor: '_Tuple2', _0: 83, _1: 71},
																											_1: 'stop_single'
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: {ctor: '_Tuple2', _0: 83, _1: 80},
																												_1: 'stop_all'
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: {ctor: '_Tuple2', _0: 82, _1: 83},
																													_1: 'restart_single'
																												},
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$Helper_DictionaryHelper$websitestripleDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple3', _0: 65, _1: 67, _2: 72},
			_1: _user$project$Helper_DataDropdownHelper$achDropdown
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple3', _0: 65, _1: 80, _2: 79},
				_1: _user$project$Helper_DataDropdownHelper$apoDropdown
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple3', _0: 65, _1: 72, _2: 80},
					_1: _user$project$Helper_DataDropdownHelper$ahpDropdown
				},
				_1: {ctor: '[]'}
			}
		}
	});
var _user$project$Helper_DictionaryHelper$websitestupleDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: 65, _1: 76},
			_1: _user$project$Helper_DataDropdownHelper$allDropdown
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: 65, _1: 67},
				_1: _user$project$Helper_DataDropdownHelper$acDropdown
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 65, _1: 80},
					_1: _user$project$Helper_DataDropdownHelper$apDropdown
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: 65, _1: 70},
						_1: _user$project$Helper_DataDropdownHelper$afDropdown
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 65, _1: 57},
							_1: _user$project$Helper_DataDropdownHelper$a9Dropdown
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: {ctor: '_Tuple2', _0: 65, _1: 87},
								_1: _user$project$Helper_DataDropdownHelper$awDropdown
							},
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	});
var _user$project$Helper_DictionaryHelper$UxDictionary = F4(
	function (a, b, c, d) {
		return {routeString: a, routeType: b, routeAction: c, name: d};
	});

var _user$project$Helper_GeneratorHelper$ctaDictionary = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 1, _1: 'Nasty!'},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 2, _1: 'Cheap!'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 3, _1: 'Terrible!'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 4, _1: 'Gross!'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 5, _1: 'Ugh!'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 6, _1: 'Whyyyy!'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 7, _1: 'Yuck!'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 8, _1: 'Awful!'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 9, _1: 'Crap!'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 10, _1: 'Ugly!'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 11, _1: 'Ewww!'},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$Helper_GeneratorHelper$randomCtaGenerator = function ($int) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		A2(_elm_lang$core$Dict$get, $int, _user$project$Helper_GeneratorHelper$ctaDictionary));
};
var _user$project$Helper_GeneratorHelper$productLikeProductFormGenerator = F3(
	function (model, productForm, productLikeInt) {
		return _elm_lang$core$Native_Utils.update(
			productForm,
			{product_like: productLikeInt});
	});
var _user$project$Helper_GeneratorHelper$ctaProductFormGenerator = F3(
	function (model, productForm, ctaInt) {
		return _elm_lang$core$Native_Utils.update(
			productForm,
			{
				cta: _user$project$Helper_GeneratorHelper$randomCtaGenerator(ctaInt)
			});
	});

var _user$project$Helper_ValidationHelper$buildFormValidationCheck = function (buildFormValidation) {
	var c7_icon_validation = buildFormValidation.c7_icon.isEmpty;
	var c7_model_validation = buildFormValidation.c7_model.isEmpty;
	var c7_display_name_validation = buildFormValidation.c7_display_name.isEmpty;
	var c7_name_validation = buildFormValidation.c7_name.isEmpty;
	var c6_icon_validation = buildFormValidation.c6_icon.isEmpty;
	var c6_model_validation = buildFormValidation.c6_model.isEmpty;
	var c6_display_name_validation = buildFormValidation.c6_display_name.isEmpty;
	var c6_name_validation = buildFormValidation.c6_name.isEmpty;
	var c5_icon_validation = buildFormValidation.c5_icon.isEmpty;
	var c5_model_validation = buildFormValidation.c5_model.isEmpty;
	var c5_display_name_validation = buildFormValidation.c5_display_name.isEmpty;
	var c5_name_validation = buildFormValidation.c5_name.isEmpty;
	var c4_icon_validation = buildFormValidation.c4_icon.isEmpty;
	var c4_model_validation = buildFormValidation.c4_model.isEmpty;
	var c4_display_name_validation = buildFormValidation.c4_display_name.isEmpty;
	var c4_name_validation = buildFormValidation.c4_name.isEmpty;
	var c3_icon_validation = buildFormValidation.c3_icon.isEmpty;
	var c3_model_validation = buildFormValidation.c3_model.isEmpty;
	var c3_display_name_validation = buildFormValidation.c3_display_name.isEmpty;
	var c3_name_validation = buildFormValidation.c3_name.isEmpty;
	var c2_icon_validation = buildFormValidation.c2_icon.isEmpty;
	var c2_model_validation = buildFormValidation.c2_model.isEmpty;
	var c2_display_name_validation = buildFormValidation.c2_display_name.isEmpty;
	var c2_name_validation = buildFormValidation.c2_name.isEmpty;
	var c1_icon_validation = buildFormValidation.c1_icon.isEmpty;
	var c1_model_validation = buildFormValidation.c1_model.isEmpty;
	var c1_display_name_validation = buildFormValidation.c1_display_name.isEmpty;
	var c1_name_validation = buildFormValidation.c1_name.isEmpty;
	var num_of_categories_validation = buildFormValidation.num_of_categories.isEmpty;
	var website_capital_validation = buildFormValidation.website_capital.isEmpty;
	var website_lower_validation = buildFormValidation.website_lower.isEmpty;
	var website_acronym_validation = buildFormValidation.website_acronym.isEmpty;
	var buildFormBoolList = A2(
		_elm_lang$core$List$filter,
		function (x) {
			return _elm_lang$core$Native_Utils.eq(x, true);
		},
		{
			ctor: '::',
			_0: website_acronym_validation,
			_1: {
				ctor: '::',
				_0: website_lower_validation,
				_1: {
					ctor: '::',
					_0: website_capital_validation,
					_1: {
						ctor: '::',
						_0: num_of_categories_validation,
						_1: {
							ctor: '::',
							_0: c1_name_validation,
							_1: {
								ctor: '::',
								_0: c1_display_name_validation,
								_1: {
									ctor: '::',
									_0: c1_model_validation,
									_1: {
										ctor: '::',
										_0: c1_icon_validation,
										_1: {
											ctor: '::',
											_0: c2_name_validation,
											_1: {
												ctor: '::',
												_0: c2_display_name_validation,
												_1: {
													ctor: '::',
													_0: c2_model_validation,
													_1: {
														ctor: '::',
														_0: c2_icon_validation,
														_1: {
															ctor: '::',
															_0: c3_name_validation,
															_1: {
																ctor: '::',
																_0: c3_display_name_validation,
																_1: {
																	ctor: '::',
																	_0: c3_model_validation,
																	_1: {
																		ctor: '::',
																		_0: c3_icon_validation,
																		_1: {
																			ctor: '::',
																			_0: c4_name_validation,
																			_1: {
																				ctor: '::',
																				_0: c4_display_name_validation,
																				_1: {
																					ctor: '::',
																					_0: c4_model_validation,
																					_1: {
																						ctor: '::',
																						_0: c4_icon_validation,
																						_1: {
																							ctor: '::',
																							_0: c5_name_validation,
																							_1: {
																								ctor: '::',
																								_0: c5_display_name_validation,
																								_1: {
																									ctor: '::',
																									_0: c5_model_validation,
																									_1: {
																										ctor: '::',
																										_0: c5_icon_validation,
																										_1: {
																											ctor: '::',
																											_0: c6_name_validation,
																											_1: {
																												ctor: '::',
																												_0: c6_display_name_validation,
																												_1: {
																													ctor: '::',
																													_0: c6_model_validation,
																													_1: {
																														ctor: '::',
																														_0: c6_icon_validation,
																														_1: {
																															ctor: '::',
																															_0: c7_name_validation,
																															_1: {
																																ctor: '::',
																																_0: c7_display_name_validation,
																																_1: {
																																	ctor: '::',
																																	_0: c7_model_validation,
																																	_1: {
																																		ctor: '::',
																																		_0: c7_icon_validation,
																																		_1: {ctor: '[]'}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
	return _elm_lang$core$List$isEmpty(buildFormBoolList);
};
var _user$project$Helper_ValidationHelper$postFormValidationCheck = function (postFormValidation) {
	var featured_image_validation = postFormValidation.featured_image.isEmpty;
	var excerpt_validation = postFormValidation.excerpt.isEmpty;
	var author_validation = postFormValidation.author.isEmpty;
	var display_name_validation = postFormValidation.display_name.isEmpty;
	var postFormBoolList = A2(
		_elm_lang$core$List$filter,
		function (x) {
			return _elm_lang$core$Native_Utils.eq(x, true);
		},
		{
			ctor: '::',
			_0: display_name_validation,
			_1: {
				ctor: '::',
				_0: author_validation,
				_1: {
					ctor: '::',
					_0: excerpt_validation,
					_1: {
						ctor: '::',
						_0: featured_image_validation,
						_1: {ctor: '[]'}
					}
				}
			}
		});
	return _elm_lang$core$List$isEmpty(postFormBoolList);
};
var _user$project$Helper_ValidationHelper$tagFormValidationCheck = function (tagForm) {
	var description_validation = tagForm.description.isEmpty;
	var display_name_validation = tagForm.display_name.isEmpty;
	var tagFormBoolList = A2(
		_elm_lang$core$List$filter,
		function (x) {
			return _elm_lang$core$Native_Utils.eq(x, true);
		},
		{
			ctor: '::',
			_0: display_name_validation,
			_1: {
				ctor: '::',
				_0: description_validation,
				_1: {ctor: '[]'}
			}
		});
	return _elm_lang$core$List$isEmpty(tagFormBoolList);
};
var _user$project$Helper_ValidationHelper$socialFormValidationCheck = function (socialFormValidation) {
	var image_caption_validation = socialFormValidation.image_caption.isEmpty;
	var url_validation = socialFormValidation.url.isEmpty;
	var featured_image_validation = socialFormValidation.featured_image.isEmpty;
	var tags_validation = socialFormValidation.tags.isEmpty;
	var description_validation = socialFormValidation.description.isEmpty;
	var display_name_validation = socialFormValidation.display_name.isEmpty;
	var socialFormBoolList = A2(
		_elm_lang$core$List$filter,
		function (x) {
			return _elm_lang$core$Native_Utils.eq(x, true);
		},
		{
			ctor: '::',
			_0: display_name_validation,
			_1: {
				ctor: '::',
				_0: description_validation,
				_1: {
					ctor: '::',
					_0: tags_validation,
					_1: {
						ctor: '::',
						_0: featured_image_validation,
						_1: {
							ctor: '::',
							_0: url_validation,
							_1: {
								ctor: '::',
								_0: image_caption_validation,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
	return _elm_lang$core$List$isEmpty(socialFormBoolList);
};
var _user$project$Helper_ValidationHelper$updateFormValidationCheck = function (updateFormValidation) {
	var author_validated = updateFormValidation.author.isEmpty;
	var excerpt_validated = updateFormValidation.excerpt.isEmpty;
	var title_validated = updateFormValidation.title.isEmpty;
	var display_name_validated = updateFormValidation.display_name.isEmpty;
	var updateFormBoolList = A2(
		_elm_lang$core$List$filter,
		function (x) {
			return _elm_lang$core$Native_Utils.eq(x, true);
		},
		{
			ctor: '::',
			_0: display_name_validated,
			_1: {
				ctor: '::',
				_0: title_validated,
				_1: {
					ctor: '::',
					_0: excerpt_validated,
					_1: {
						ctor: '::',
						_0: author_validated,
						_1: {ctor: '[]'}
					}
				}
			}
		});
	return _elm_lang$core$List$isEmpty(updateFormBoolList);
};
var _user$project$Helper_ValidationHelper$productFormValidationCheck = function (productFormValidation) {
	var product_like_validated = productFormValidation.product_like.isEmpty;
	var tag_id_validated = productFormValidation.tag_id.isEmpty;
	var url_text_validated = productFormValidation.url_text.isEmpty;
	var url_validated = productFormValidation.url.isEmpty;
	var price_validated = productFormValidation.price.isEmpty;
	var cta_validated = productFormValidation.cta.isEmpty;
	var featured_image_validated = productFormValidation.featured_image.isEmpty;
	var blog_description_validated = productFormValidation.blog_description.isEmpty;
	var description_validated = productFormValidation.description.isEmpty;
	var productFormBoolList = A2(
		_elm_lang$core$List$filter,
		function (x) {
			return _elm_lang$core$Native_Utils.eq(x, true);
		},
		{
			ctor: '::',
			_0: description_validated,
			_1: {
				ctor: '::',
				_0: blog_description_validated,
				_1: {
					ctor: '::',
					_0: featured_image_validated,
					_1: {
						ctor: '::',
						_0: cta_validated,
						_1: {
							ctor: '::',
							_0: price_validated,
							_1: {
								ctor: '::',
								_0: url_validated,
								_1: {
									ctor: '::',
									_0: url_text_validated,
									_1: {
										ctor: '::',
										_0: tag_id_validated,
										_1: {
											ctor: '::',
											_0: product_like_validated,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
	var display_name_validated = productFormValidation.display_name.isEmpty;
	return _elm_lang$core$List$isEmpty(productFormBoolList);
};
var _user$project$Helper_ValidationHelper$createTagIdValidation = function (bool) {
	return {isEmpty: bool, validationMessage: 'Please select tag values', validationType: _user$project$Model_ModelValidation$StringValidation};
};
var _user$project$Helper_ValidationHelper$createBoolValidation = function (bool) {
	return {isEmpty: bool, validationMessage: 'Please provide checkbox value', validationType: _user$project$Model_ModelValidation$BoolValidation};
};
var _user$project$Helper_ValidationHelper$createFloatValidation = function (bool) {
	return {isEmpty: bool, validationMessage: 'Please input a value', validationType: _user$project$Model_ModelValidation$FloatValidation};
};
var _user$project$Helper_ValidationHelper$createIntValidation = function (bool) {
	return {isEmpty: bool, validationMessage: 'Please input a number value', validationType: _user$project$Model_ModelValidation$IntValidation};
};
var _user$project$Helper_ValidationHelper$createStringValidation = function (bool) {
	return {isEmpty: bool, validationMessage: 'Please input a text value', validationType: _user$project$Model_ModelValidation$StringValidation};
};
var _user$project$Helper_ValidationHelper$productFormValidationUpdate = F2(
	function (model, productForm) {
		var productFormValidation = model.productFormValidation;
		var product_like_validated = _user$project$Helper_ValidationHelper$createIntValidation(
			_elm_lang$core$String$isEmpty(
				_elm_lang$core$Basics$toString(productForm.product_like)));
		var tag_id_validated = _user$project$Helper_ValidationHelper$createTagIdValidation(
			_elm_lang$core$List$isEmpty(productForm.tag_id));
		var url_text_validated = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(productForm.url_text));
		var url_validated = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(productForm.url));
		var price_validated = _user$project$Helper_ValidationHelper$createFloatValidation(
			_elm_lang$core$String$isEmpty(
				_elm_lang$core$Basics$toString(productForm.price)));
		var cta_validated = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(productForm.cta));
		var featured_image_validated = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(productForm.featured_image));
		var blog_description_validated = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(productForm.blog_description));
		var description_validated = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(productForm.description));
		var display_name_validated = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(productForm.display_name));
		return _elm_lang$core$Native_Utils.update(
			productFormValidation,
			{display_name: display_name_validated, description: description_validated, blog_description: blog_description_validated, featured_image: featured_image_validated, cta: cta_validated, price: price_validated, url: url_validated, url_text: url_text_validated, tag_id: tag_id_validated, product_like: product_like_validated});
	});
var _user$project$Helper_ValidationHelper$updateFormValidationUpdate = F2(
	function (model, updateForm) {
		var updateFormValidation = model.updateFormValidation;
		var author_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(updateForm.author));
		var excerpt_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(updateForm.excerpt));
		var title_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(updateForm.title));
		var display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(updateForm.display_name));
		return _elm_lang$core$Native_Utils.update(
			updateFormValidation,
			{display_name: display_name_validation, title: title_validation, excerpt: excerpt_validation, author: author_validation});
	});
var _user$project$Helper_ValidationHelper$socialFormValidationUpdate = F2(
	function (model, socialForm) {
		var socialFormValidation = model.socialFormValidation;
		var image_caption_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(socialForm.image_caption));
		var url_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(socialForm.url));
		var featured_image_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(socialForm.featured_image));
		var tags_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(socialForm.tags));
		var description_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(socialForm.description));
		var display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(socialForm.display_name));
		return _elm_lang$core$Native_Utils.update(
			socialFormValidation,
			{display_name: display_name_validation, description: description_validation, tags: tags_validation, featured_image: featured_image_validation, url: url_validation, image_caption: image_caption_validation});
	});
var _user$project$Helper_ValidationHelper$tagFormValidationUpdate = F2(
	function (model, tagForm) {
		var tagFormValidation = model.tagForm;
		var description_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(tagForm.description));
		var display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(tagForm.display_name));
		return _elm_lang$core$Native_Utils.update(
			tagFormValidation,
			{display_name: display_name_validation, description: description_validation});
	});
var _user$project$Helper_ValidationHelper$postFormValidationUpdate = F2(
	function (model, postForm) {
		var postFormValidation = model.postFormValidation;
		var featured_image_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(postForm.featured_image));
		var excerpt_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(postForm.excerpt));
		var author_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(postForm.author));
		var display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(postForm.display_name));
		return _elm_lang$core$Native_Utils.update(
			postFormValidation,
			{display_name: display_name_validation, author: author_validation, excerpt: excerpt_validation, featured_image: featured_image_validation});
	});
var _user$project$Helper_ValidationHelper$buildFormValidationUpdate = F2(
	function (model, buildForm) {
		var c7_icon_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c7_icon));
		var c7_model_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c7_model));
		var c7_display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c7_display_name));
		var c7_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c7_name));
		var c6_icon_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c6_icon));
		var c6_model_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c6_model));
		var c6_display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c6_display_name));
		var c6_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c6_name));
		var c5_icon_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c5_icon));
		var c5_model_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c5_model));
		var c5_display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c5_display_name));
		var c5_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c5_name));
		var c4_icon_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c4_icon));
		var c4_model_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c4_model));
		var c4_display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c4_display_name));
		var c4_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c4_name));
		var c3_icon_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c3_icon));
		var c3_model_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c3_model));
		var c3_display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c3_display_name));
		var c3_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c3_name));
		var c2_icon_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c2_icon));
		var c2_model_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c2_model));
		var c2_display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c2_display_name));
		var c2_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c2_name));
		var c1_icon_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c1_icon));
		var c1_model_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c1_model));
		var c1_display_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c1_display_name));
		var c1_name_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.c1_name));
		var num_of_categories_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.num_of_categories));
		var website_capital_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.website_capital));
		var website_lower_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.website_lower));
		var website_acronym_validation = _user$project$Helper_ValidationHelper$createStringValidation(
			_elm_lang$core$String$isEmpty(buildForm.website_acronym));
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{website_acronym: website_acronym_validation, website_lower: website_lower_validation, website_capital: website_capital_validation, num_of_categories: num_of_categories_validation, c1_name: c1_name_validation, c1_display_name: c1_display_name_validation, c1_model: c1_model_validation, c1_icon: c1_icon_validation, c2_name: c2_name_validation, c2_display_name: c2_display_name_validation, c2_model: c2_model_validation, c2_icon: c2_icon_validation, c3_name: c3_name_validation, c3_display_name: c3_display_name_validation, c3_model: c3_model_validation, c3_icon: c3_icon_validation, c4_name: c4_name_validation, c4_display_name: c4_display_name_validation, c4_model: c4_model_validation, c4_icon: c4_icon_validation, c5_name: c5_name_validation, c5_display_name: c5_display_name_validation, c5_model: c5_model_validation, c5_icon: c5_icon_validation, c6_name: c6_name_validation, c6_display_name: c6_display_name_validation, c6_model: c6_model_validation, c6_icon: c6_icon_validation, c7_name: c7_name_validation, c7_display_name: c7_display_name_validation, c7_model: c7_model_validation, c7_icon: c7_icon_validation});
	});
var _user$project$Helper_ValidationHelper$productTypeIsEmpty = function (item) {
	var _p0 = item;
	switch (_p0) {
		case 'general':
			return true;
		case 'featured':
			return true;
		case 'submission':
			return true;
		default:
			return false;
	}
};
var _user$project$Helper_ValidationHelper$floatIsEmpty = function (item) {
	var _p1 = item;
	if (_p1 === 0.0) {
		return false;
	} else {
		return true;
	}
};
var _user$project$Helper_ValidationHelper$intIsEmpty = function (item) {
	var _p2 = item;
	if (_p2 === 0) {
		return false;
	} else {
		return true;
	}
};

var _user$project$Helper_UpdateHelper$updateProductForm = function (newProduct) {
	return {
		display_name: '',
		description: '',
		blog_description: '',
		original_featured_image: '',
		featured_image: newProduct.featured_image,
		draft: false,
		schedule_date: _user$project$Helper_DataEmptyHelper$emptyScheduleDate,
		cta: 'Save',
		price: newProduct.price,
		url: newProduct.url,
		url_text: '',
		category: _user$project$Helper_DataEmptyHelper$emptyCategory,
		category_id: '',
		tag_id: {ctor: '[]'},
		product_like: 0,
		product_type: 'general'
	};
};
var _user$project$Helper_UpdateHelper$retrievePostFromId = F2(
	function (postList, itemId) {
		return _user$project$Helper_ConvertHelper$postAssocToProductForm(
			A2(
				_elm_lang$core$Maybe$withDefault,
				_user$project$Helper_DataEmptyHelper$emptyPostAssoc,
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						function (x) {
							return _elm_lang$core$Native_Utils.eq(x.id, itemId);
						},
						postList))));
	});
var _user$project$Helper_UpdateHelper$retrieveUpdateFromId = F2(
	function (updateList, itemId) {
		return _user$project$Helper_ConvertHelper$updateToUpdateForm(
			A2(
				_elm_lang$core$Maybe$withDefault,
				_user$project$Helper_DataEmptyHelper$emptyUpdate,
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						function (x) {
							return _elm_lang$core$Native_Utils.eq(x.id, itemId);
						},
						updateList))));
	});
var _user$project$Helper_UpdateHelper$retrieveSocialFromId = F2(
	function (socialList, itemId) {
		return _user$project$Helper_ConvertHelper$socialToSocialForm(
			A2(
				_elm_lang$core$Maybe$withDefault,
				_user$project$Helper_DataEmptyHelper$emptySocial,
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						function (x) {
							return _elm_lang$core$Native_Utils.eq(x.id, itemId);
						},
						socialList))));
	});
var _user$project$Helper_UpdateHelper$retrieveProductAssocFromId = F2(
	function (productAssocList, itemId) {
		return _user$project$Helper_ConvertHelper$productAssocToProductForm(
			A2(
				_elm_lang$core$Maybe$withDefault,
				_user$project$Helper_DataEmptyHelper$emptyProductAssoc,
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						function (x) {
							return _elm_lang$core$Native_Utils.eq(x.id, itemId);
						},
						productAssocList))));
	});
var _user$project$Helper_UpdateHelper$retrieveTagFromId = F2(
	function (tagAssocList, itemId) {
		return _user$project$Helper_ConvertHelper$tagAssocToTagForm(
			A2(
				_elm_lang$core$Maybe$withDefault,
				_user$project$Helper_DataEmptyHelper$emptyTagAssoc,
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						function (x) {
							return _elm_lang$core$Native_Utils.eq(x.id, itemId);
						},
						tagAssocList))));
	});
var _user$project$Helper_UpdateHelper$deleteLastItemFromList = function (keysDown) {
	var keysDownLength = _elm_lang$core$List$length(keysDown) - 1;
	return A2(_elm_lang$core$List$take, keysDownLength, keysDown);
};
var _user$project$Helper_UpdateHelper$updateProductFormProductTags = F2(
	function (tagAssocList, productForm) {
		return _elm_lang$core$Native_Utils.update(
			productForm,
			{tag_id: tagAssocList});
	});
var _user$project$Helper_UpdateHelper$createMultiSelectList = function (listTagAssoc) {
	return A2(
		_elm_lang$core$List$map,
		function (tag) {
			return {value: tag.id, text: tag.name, enabled: true};
		},
		listTagAssoc);
};
var _user$project$Helper_UpdateHelper$prependItemToList = F2(
	function (value, list) {
		return {ctor: '::', _0: value, _1: list};
	});
var _user$project$Helper_UpdateHelper$maybePrepend = F2(
	function (value, maybeList) {
		var _p0 = maybeList;
		if (_p0.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				A2(_user$project$Helper_UpdateHelper$prependItemToList, value, _p0._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _user$project$Helper_UpdateHelper$updateCategoryIdFromCategoriesList = F2(
	function (productForm, categoryList) {
		var _p1 = _elm_lang$core$List$head(categoryList);
		if (_p1.ctor === 'Just') {
			var _p2 = _p1._0;
			return _elm_lang$core$Native_Utils.update(
				productForm,
				{category_id: _p2.id, category: _p2});
		} else {
			return productForm;
		}
	});
var _user$project$Helper_UpdateHelper$incrementDuration = function (record) {
	return _elm_lang$core$Native_Utils.update(
		record,
		{duration: record.duration + 1});
};
var _user$project$Helper_UpdateHelper$currentTaskGenerator = function (command) {
	return {name: command, duration: 0};
};
var _user$project$Helper_UpdateHelper$setInitialSocialFormScheduleDate = F2(
	function (date, socialForm) {
		var date_year = _elm_lang$core$Date$year(date);
		var date_month = _user$project$Helper_DateHelper$dateMonthToActualInt(
			_elm_lang$core$Date$month(date));
		var date_day = _elm_lang$core$Date$day(date);
		var schedule_datez = {day: date_day, month: date_month, year: date_year};
		return _elm_lang$core$Native_Utils.update(
			socialForm,
			{schedule_date: schedule_datez});
	});
var _user$project$Helper_UpdateHelper$setInitialSocialFormScheduleDateMaybe = F2(
	function (date, socialForm) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			socialForm,
			A2(
				_elm_lang$core$Maybe$map,
				A2(_elm_lang$core$Basics$flip, _user$project$Helper_UpdateHelper$setInitialSocialFormScheduleDate, socialForm),
				date));
	});
var _user$project$Helper_UpdateHelper$setInitialUpdateFormScheduleDate = F2(
	function (date, updateForm) {
		var date_year = _elm_lang$core$Date$year(date);
		var date_month = _user$project$Helper_DateHelper$dateMonthToActualInt(
			_elm_lang$core$Date$month(date));
		var date_day = _elm_lang$core$Date$day(date);
		var schedule_datez = {day: date_day, month: date_month, year: date_year};
		return _elm_lang$core$Native_Utils.update(
			updateForm,
			{schedule_date: schedule_datez});
	});
var _user$project$Helper_UpdateHelper$setInitialUpdateFormScheduleDateMaybe = F2(
	function (date, updateForm) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			updateForm,
			A2(
				_elm_lang$core$Maybe$map,
				A2(_elm_lang$core$Basics$flip, _user$project$Helper_UpdateHelper$setInitialUpdateFormScheduleDate, updateForm),
				date));
	});
var _user$project$Helper_UpdateHelper$setInitialProductFormScheduleDate = F2(
	function (date, productForm) {
		var date_year = _elm_lang$core$Date$year(date);
		var date_month = _user$project$Helper_DateHelper$dateMonthToActualInt(
			_elm_lang$core$Date$month(date));
		var date_day = _elm_lang$core$Date$day(date);
		var schedule_datez = {day: date_day, month: date_month, year: date_year};
		return _elm_lang$core$Native_Utils.update(
			productForm,
			{schedule_date: schedule_datez});
	});
var _user$project$Helper_UpdateHelper$setInitialProductFormScheduleDateMaybe = F2(
	function (date, productForm) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			productForm,
			A2(
				_elm_lang$core$Maybe$map,
				A2(_elm_lang$core$Basics$flip, _user$project$Helper_UpdateHelper$setInitialProductFormScheduleDate, productForm),
				date));
	});
var _user$project$Helper_UpdateHelper$stringToInt = function (script) {
	return _elm_lang$core$String$toInt(script);
};
var _user$project$Helper_UpdateHelper$convertCommandType = function (commandType) {
	var _p3 = commandType;
	switch (_p3.ctor) {
		case 'Development':
			return 'development';
		case 'Production':
			return 'production';
		default:
			return 'null';
	}
};
var _user$project$Helper_UpdateHelper$convertServerAction = function (serverAction) {
	var _p4 = serverAction;
	switch (_p4.ctor) {
		case 'StartServer':
			return 'Start Server';
		case 'RestartServer':
			return 'Restart Server';
		default:
			return 'Stop Server';
	}
};

var _user$project$Helper_KeyboardHelper$normaliseSendInitialMessageCommand = function (command) {
	return A2(
		_elm_lang$core$String$join,
		' ',
		A2(
			_elm_lang$core$List$map,
			function (x) {
				var leftSide = _elm_lang$core$String$right(
					_elm_lang$core$String$length(x) - 1)(x);
				var rightSide = A2(_elm_lang$core$String$left, 1, x);
				return A2(_elm_lang$core$String$append, rightSide, leftSide);
			},
			A2(_elm_lang$core$String$split, '-', command)));
};
var _user$project$Helper_KeyboardHelper$keyDownDevelopmentCommand = F5(
	function (model, first, second, devOrProd, developmentDropdown) {
		var unwrapDevOrProd = _user$project$Helper_UpdateHelper$convertCommandType(
			A2(_elm_lang$core$Maybe$withDefault, _user$project$Model_ModelDevelopment$Development, devOrProd));
		var selection_two_upper = _elm_lang$core$String$toUpper(
			A2(
				_elm_lang$core$Maybe$withDefault,
				'',
				A2(
					_elm_lang$core$Dict$get,
					{ctor: '_Tuple2', _0: first, _1: second},
					_user$project$Helper_DictionaryHelper$developmentCommandsDictionary)));
		var selection_two = A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Dict$get,
				{ctor: '_Tuple2', _0: first, _1: second},
				_user$project$Helper_DictionaryHelper$developmentCommandsDictionary));
		var selection_two_without_maybe = A2(
			_elm_lang$core$Dict$get,
			{ctor: '_Tuple2', _0: first, _1: second},
			_user$project$Helper_DictionaryHelper$developmentCommandsDictionary);
		var _p0 = _elm_lang$core$List$length(model.keysDown);
		if (_p0 === 2) {
			var _p1 = selection_two_without_maybe;
			if (_p1.ctor === 'Just') {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							keysDown: {ctor: '[]'},
							currentTasks: A2(
								_user$project$Helper_UpdateHelper$maybePrepend,
								_user$project$Helper_UpdateHelper$currentTaskGenerator(selection_two),
								model.currentTasks)
						}),
					{
						ctor: '::',
						_0: A3(
							_user$project$Command$sendInitialMessage,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_user$project$Helper_KeyboardHelper$normaliseSendInitialMessageCommand(selection_two),
								A2(_elm_lang$core$Basics_ops['++'], ' ', unwrapDevOrProd)),
							'Initial',
							_user$project$Model_ModelMisc$Begin),
						_1: {
							ctor: '::',
							_0: A3(_user$project$Command$command, selection_two, unwrapDevOrProd, developmentDropdown.acronym),
							_1: {ctor: '[]'}
						}
					});
			} else {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							keysDown: {ctor: '[]'}
						}),
					{
						ctor: '::',
						_0: A3(
							_user$project$Command$sendInitialMessage,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Non Existent ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$String$toUpper(unwrapDevOrProd),
									' Command')),
							'Does Not Exist',
							_user$project$Model_ModelMisc$NonExistent),
						_1: {ctor: '[]'}
					});
			}
		} else {
			return A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_elm_lang$core$Native_Utils.update(
					model,
					{
						keysDown: {ctor: '[]'}
					}),
				{
					ctor: '::',
					_0: A3(
						_user$project$Command$sendInitialMessage,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'Non Existent ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$String$toUpper(unwrapDevOrProd),
								' Command')),
						'Does Not Exist',
						_user$project$Model_ModelMisc$NonExistent),
					_1: {ctor: '[]'}
				});
		}
	});
var _user$project$Helper_KeyboardHelper$keyDownChangeDropdown = F4(
	function (model, first, second, third) {
		var currentDate = _user$project$Helper_DateHelper$maybeDate(model.currentDate);
		var selection_three = A2(
			_elm_lang$core$Maybe$withDefault,
			_user$project$Helper_DataDropdownHelper$acDropdown,
			A2(
				_elm_lang$core$Dict$get,
				{ctor: '_Tuple3', _0: first, _1: second, _2: third},
				_user$project$Helper_DictionaryHelper$websitestripleDictionary));
		var selection_three_without_maybe = A2(
			_elm_lang$core$Dict$get,
			{ctor: '_Tuple3', _0: first, _1: second, _2: third},
			_user$project$Helper_DictionaryHelper$websitestripleDictionary);
		var selection_two = A2(
			_elm_lang$core$Maybe$withDefault,
			_user$project$Helper_DataDropdownHelper$acDropdown,
			A2(
				_elm_lang$core$Dict$get,
				{ctor: '_Tuple2', _0: first, _1: second},
				_user$project$Helper_DictionaryHelper$websitestupleDictionary));
		var selection_two_without_maybe = A2(
			_elm_lang$core$Dict$get,
			{ctor: '_Tuple2', _0: first, _1: second},
			_user$project$Helper_DictionaryHelper$websitestupleDictionary);
		var _p2 = _elm_lang$core$List$length(model.keysDown);
		switch (_p2) {
			case 2:
				var _p3 = selection_two_without_maybe;
				if (_p3.ctor === 'Just') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'},
								developmentDropdownSelection: selection_two,
								configDropdownSelection: selection_two,
								individualEnvDropdownSelection: selection_two
							}),
						{
							ctor: '::',
							_0: _elm_lang$navigation$Navigation$newUrl(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'#websites/',
									A2(
										_elm_lang$core$Basics_ops['++'],
										selection_two.acronym,
										A2(
											_elm_lang$core$Basics_ops['++'],
											'/',
											A2(
												_elm_lang$core$Basics_ops['++'],
												model.routeType,
												A2(_elm_lang$core$Basics_ops['++'], '/', model.routeAction)))))),
							_1: {ctor: '[]'}
						});
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'}
							}),
						{
							ctor: '::',
							_0: A3(_user$project$Command$sendInitialMessage, 'Non Existent DROPDOWN Combination', 'Does Not Exist', _user$project$Model_ModelMisc$NonExistent),
							_1: {ctor: '[]'}
						});
				}
			case 3:
				var _p4 = selection_three_without_maybe;
				if (_p4.ctor === 'Just') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'},
								developmentDropdownSelection: selection_three,
								configDropdownSelection: selection_three,
								individualEnvDropdownSelection: selection_three
							}),
						{
							ctor: '::',
							_0: _elm_lang$navigation$Navigation$newUrl(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'#websites/',
									A2(
										_elm_lang$core$Basics_ops['++'],
										selection_three.acronym,
										A2(
											_elm_lang$core$Basics_ops['++'],
											'/',
											A2(
												_elm_lang$core$Basics_ops['++'],
												model.routeType,
												A2(_elm_lang$core$Basics_ops['++'], '/', model.routeAction)))))),
							_1: {ctor: '[]'}
						});
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'}
							}),
						{
							ctor: '::',
							_0: A3(_user$project$Command$sendInitialMessage, 'Non Existent DROPDOWN Select', 'Does Not Exist', _user$project$Model_ModelMisc$NonExistent),
							_1: {ctor: '[]'}
						});
				}
			default:
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							keysDown: {ctor: '[]'}
						}),
					{
						ctor: '::',
						_0: A3(_user$project$Command$sendInitialMessage, 'Non Existent DROPDOWN Select', 'Does Not Exist', _user$project$Model_ModelMisc$NonExistent),
						_1: {ctor: '[]'}
					});
		}
	});
var _user$project$Helper_KeyboardHelper$keyDownChangeUX = F4(
	function (model, first, second, developmentDropdown) {
		var currentDate = _user$project$Helper_DateHelper$maybeDate(model.currentDate);
		var selection_two = A2(
			_elm_lang$core$Maybe$withDefault,
			{routeString: '', name: '', routeAction: '', routeType: ''},
			A2(
				_elm_lang$core$Dict$get,
				{ctor: '_Tuple2', _0: first, _1: second},
				_user$project$Helper_DictionaryHelper$uxTupleDictionary));
		var selection_two_without_maybe = A2(
			_elm_lang$core$Dict$get,
			{ctor: '_Tuple2', _0: first, _1: second},
			_user$project$Helper_DictionaryHelper$uxTupleDictionary);
		var selection_one = A2(
			_elm_lang$core$Maybe$withDefault,
			{routeString: '', name: '', routeAction: '', routeType: ''},
			A2(_elm_lang$core$Dict$get, first, _user$project$Helper_DictionaryHelper$uxSingleDictionary));
		var selection_one_without_maybe = A2(_elm_lang$core$Dict$get, first, _user$project$Helper_DictionaryHelper$uxSingleDictionary);
		var _p5 = _elm_lang$core$List$length(model.keysDown);
		switch (_p5) {
			case 1:
				var _p6 = selection_one_without_maybe;
				if (_p6.ctor === 'Just') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'}
							}),
						{
							ctor: '::',
							_0: _elm_lang$navigation$Navigation$newUrl(
								A2(_elm_lang$core$Basics_ops['++'], '#', selection_one.routeString)),
							_1: {ctor: '[]'}
						});
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'}
							}),
						{
							ctor: '::',
							_0: A3(_user$project$Command$sendInitialMessage, 'Non Existent URL', 'URL Change', _user$project$Model_ModelMisc$NonExistent),
							_1: {ctor: '[]'}
						});
				}
			case 2:
				var _p7 = selection_two_without_maybe;
				if (_p7.ctor === 'Just') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'}
							}),
						{
							ctor: '::',
							_0: _elm_lang$navigation$Navigation$newUrl(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'#websites/',
									A2(
										_elm_lang$core$Basics_ops['++'],
										developmentDropdown.acronym,
										A2(_elm_lang$core$Basics_ops['++'], '/', selection_two.routeString)))),
							_1: {ctor: '[]'}
						});
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'}
							}),
						{
							ctor: '::',
							_0: A3(_user$project$Command$sendInitialMessage, 'Non Existent URL', 'URL Change', _user$project$Model_ModelMisc$NonExistent),
							_1: {ctor: '[]'}
						});
				}
			default:
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							keysDown: {ctor: '[]'}
						}),
					{
						ctor: '::',
						_0: A3(_user$project$Command$sendInitialMessage, 'Non Existent Command', 'Does Not Exist', _user$project$Model_ModelMisc$NonExistent),
						_1: {ctor: '[]'}
					});
		}
	});
var _user$project$Helper_KeyboardHelper$keyDownSubmitData = F4(
	function (model, first, second, developmentDropdown) {
		var selection_two_websites_type = A2(
			_elm_lang$core$Maybe$withDefault,
			_user$project$Model_ModelKeyboard$ProductFormType,
			function (_) {
				return _.websitesType;
			}(
				A2(
					_elm_lang$core$Maybe$withDefault,
					{
						submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
						websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$ProductFormType)
					},
					A2(
						_elm_lang$core$Dict$get,
						{ctor: '_Tuple2', _0: first, _1: second},
						_user$project$Helper_DictionaryHelper$submitDataDoubleDictionary))));
		var selection_two = A2(
			_elm_lang$core$Maybe$withDefault,
			{
				submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
				websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$ProductFormType)
			},
			A2(
				_elm_lang$core$Dict$get,
				{ctor: '_Tuple2', _0: first, _1: second},
				_user$project$Helper_DictionaryHelper$submitDataDoubleDictionary));
		var selection_two_without_maybe = A2(
			_elm_lang$core$Dict$get,
			{ctor: '_Tuple2', _0: first, _1: second},
			_user$project$Helper_DictionaryHelper$submitDataDoubleDictionary);
		var selection_one_websites_type = A2(
			_elm_lang$core$Maybe$withDefault,
			_user$project$Model_ModelKeyboard$ProductFormType,
			function (_) {
				return _.websitesType;
			}(
				A2(
					_elm_lang$core$Maybe$withDefault,
					{
						submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
						websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$ProductFormType)
					},
					A2(_elm_lang$core$Dict$get, first, _user$project$Helper_DictionaryHelper$submitDataDictionary))));
		var selection_one = A2(
			_elm_lang$core$Maybe$withDefault,
			{
				submit_type: _user$project$Model_ModelKeyboard$WebsitesSubmit,
				websitesType: _elm_lang$core$Maybe$Just(_user$project$Model_ModelKeyboard$ProductFormType)
			},
			A2(_elm_lang$core$Dict$get, first, _user$project$Helper_DictionaryHelper$submitDataDictionary));
		var selection_one_without_maybe = A2(_elm_lang$core$Dict$get, first, _user$project$Helper_DictionaryHelper$submitDataDictionary);
		var _p8 = _elm_lang$core$List$length(model.keysDown);
		switch (_p8) {
			case 1:
				var _p9 = selection_one.submit_type;
				switch (_p9.ctor) {
					case 'CommonSubmit':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									keysDown: {ctor: '[]'}
								}),
							{
								ctor: '::',
								_0: A3(_user$project$Command$sendInitialMessage, 'Update Common ENV', 'Submit Common ENV', _user$project$Model_ModelMisc$Begin),
								_1: {
									ctor: '::',
									_0: _user$project$Command$updateCommonEnv(model.commonEnvData),
									_1: {ctor: '[]'}
								}
							});
					case 'IndividualSubmit':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									keysDown: {ctor: '[]'}
								}),
							{
								ctor: '::',
								_0: A3(
									_user$project$Command$sendInitialMessage,
									A2(
										_elm_lang$core$Basics_ops['++'],
										'Update ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$String$toUpper(model.individualEnvDropdownSelection.acronym),
											' - Individual ENV')),
									'Submit Individual ENV',
									_user$project$Model_ModelMisc$Begin),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Command$updateIndividualEnv, model.individualEnvData, model.individualEnvDropdownSelection),
									_1: {ctor: '[]'}
								}
							});
					case 'EnvSubmit':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									keysDown: {ctor: '[]'}
								}),
							{
								ctor: '::',
								_0: A3(
									_user$project$Command$sendInitialMessage,
									A2(
										_elm_lang$core$Basics_ops['++'],
										'Update ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$String$toUpper(model.configDropdownSelection.acronym),
											' - Config ENV')),
									'Submit Config ENV',
									_user$project$Model_ModelMisc$Begin),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Command$updateConfig, model.configEnvData, model.configDropdownSelection),
									_1: {ctor: '[]'}
								}
							});
					case 'BuildSubmit':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									keysDown: {ctor: '[]'}
								}),
							{ctor: '[]'});
					case 'ProductSearch':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									keysDown: {ctor: '[]'}
								}),
							{ctor: '[]'});
					default:
						var _p10 = selection_one_websites_type;
						switch (_p10.ctor) {
							case 'ProductFormType':
								var _p11 = _user$project$Helper_ValidationHelper$productFormValidationCheck(model.productFormValidation);
								if (_p11 === true) {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Submit New ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Product')),
												'Submit Product',
												_user$project$Model_ModelMisc$Begin),
											_1: {
												ctor: '::',
												_0: A2(
													_user$project$Command$itemCreate,
													_user$project$Model_ModelDataType$ProductDataFormType(model.productForm),
													model.routeAcronym),
												_1: {ctor: '[]'}
											}
										});
								} else {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Invalid ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Product')),
												'Invalid',
												_user$project$Model_ModelMisc$Failure),
											_1: {ctor: '[]'}
										});
								}
							case 'PostFormType':
								var _p12 = _user$project$Helper_ValidationHelper$postFormValidationCheck(model.postFormValidation);
								if (_p12 === true) {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Submit New ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Post')),
												'Submit Post',
												_user$project$Model_ModelMisc$Begin),
											_1: {
												ctor: '::',
												_0: A2(
													_user$project$Command$itemCreate,
													_user$project$Model_ModelDataType$PostDataFormType(model.postForm),
													model.routeAcronym),
												_1: {ctor: '[]'}
											}
										});
								} else {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Invalid ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Post')),
												'Invalid',
												_user$project$Model_ModelMisc$Failure),
											_1: {ctor: '[]'}
										});
								}
							case 'TagFormType':
								var _p13 = _user$project$Helper_ValidationHelper$tagFormValidationCheck(model.tagFormValidation);
								if (_p13 === true) {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Submit New ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Tag')),
												'Submit Tag',
												_user$project$Model_ModelMisc$Begin),
											_1: {
												ctor: '::',
												_0: A2(
													_user$project$Command$itemCreate,
													_user$project$Model_ModelDataType$TagDataFormType(model.tagForm),
													model.routeAcronym),
												_1: {ctor: '[]'}
											}
										});
								} else {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Invalid ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Tag')),
												'Invalid',
												_user$project$Model_ModelMisc$Failure),
											_1: {ctor: '[]'}
										});
								}
							case 'UpdateFormType':
								var _p14 = _user$project$Helper_ValidationHelper$updateFormValidationCheck(model.updateFormValidation);
								if (_p14 === true) {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Submit New ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Update')),
												'Submit Update',
												_user$project$Model_ModelMisc$Begin),
											_1: {
												ctor: '::',
												_0: A2(
													_user$project$Command$itemCreate,
													_user$project$Model_ModelDataType$UpdateDataFormType(model.updateForm),
													model.routeAcronym),
												_1: {ctor: '[]'}
											}
										});
								} else {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Invalid ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Update')),
												'Invalid',
												_user$project$Model_ModelMisc$Failure),
											_1: {ctor: '[]'}
										});
								}
							default:
								var _p15 = _user$project$Helper_ValidationHelper$socialFormValidationCheck(model.socialFormValidation);
								if (_p15 === true) {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Submit New ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Social')),
												'Submit Social',
												_user$project$Model_ModelMisc$Begin),
											_1: {
												ctor: '::',
												_0: A2(
													_user$project$Command$itemCreate,
													_user$project$Model_ModelDataType$SocialDataFormType(model.socialForm),
													model.routeAcronym),
												_1: {ctor: '[]'}
											}
										});
								} else {
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												keysDown: {ctor: '[]'},
												socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm)
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'Invalid ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$String$toUpper(model.routeAcronym),
														' Social')),
												'Invalid',
												_user$project$Model_ModelMisc$Failure),
											_1: {ctor: '[]'}
										});
								}
						}
				}
			case 2:
				var _p16 = selection_two.submit_type;
				if (_p16.ctor === 'WebsitesSubmit') {
					var _p17 = selection_two_websites_type;
					switch (_p17.ctor) {
						case 'ProductFormType':
							var _p18 = _user$project$Helper_ValidationHelper$productFormValidationCheck(model.productFormValidation);
							if (_p18 === true) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Edit ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Product')),
											'Edit Product',
											_user$project$Model_ModelMisc$Begin),
										_1: {
											ctor: '::',
											_0: A3(
												_user$project$Command$itemUpdate,
												_user$project$Model_ModelDataType$ProductDataFormType(model.productForm),
												model.routeAcronym,
												model.routeId),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Invalid ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Product')),
											'Invalid',
											_user$project$Model_ModelMisc$Failure),
										_1: {ctor: '[]'}
									});
							}
						case 'PostFormType':
							var _p19 = _user$project$Helper_ValidationHelper$postFormValidationCheck(model.postFormValidation);
							if (_p19 === true) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Edit ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Post')),
											'Edit Post',
											_user$project$Model_ModelMisc$Begin),
										_1: {
											ctor: '::',
											_0: A3(
												_user$project$Command$itemUpdate,
												_user$project$Model_ModelDataType$PostDataFormType(model.postForm),
												model.routeAcronym,
												model.routeId),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Invalid ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Post')),
											'Invalid',
											_user$project$Model_ModelMisc$Failure),
										_1: {ctor: '[]'}
									});
							}
						case 'TagFormType':
							var _p20 = _user$project$Helper_ValidationHelper$tagFormValidationCheck(model.tagFormValidation);
							if (_p20 === true) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Edit ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Tag')),
											'Edit Tag',
											_user$project$Model_ModelMisc$Begin),
										_1: {
											ctor: '::',
											_0: A3(
												_user$project$Command$itemUpdate,
												_user$project$Model_ModelDataType$TagDataFormType(model.tagForm),
												model.routeAcronym,
												model.routeId),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Invalid ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Tag')),
											'Invalid',
											_user$project$Model_ModelMisc$Failure),
										_1: {ctor: '[]'}
									});
							}
						case 'UpdateFormType':
							var _p21 = _user$project$Helper_ValidationHelper$updateFormValidationCheck(model.updateFormValidation);
							if (_p21 === true) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Edit ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Update')),
											'Edit Update',
											_user$project$Model_ModelMisc$Begin),
										_1: {
											ctor: '::',
											_0: A3(
												_user$project$Command$itemUpdate,
												_user$project$Model_ModelDataType$UpdateDataFormType(model.updateForm),
												model.routeAcronym,
												model.routeId),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Invalid ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Update')),
											'Invalid',
											_user$project$Model_ModelMisc$Failure),
										_1: {ctor: '[]'}
									});
							}
						default:
							var _p22 = _user$project$Helper_ValidationHelper$socialFormValidationCheck(model.socialFormValidation);
							if (_p22 === true) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Edit ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Social')),
											'Edit Social',
											_user$project$Model_ModelMisc$Begin),
										_1: {
											ctor: '::',
											_0: A3(
												_user$project$Command$itemUpdate,
												_user$project$Model_ModelDataType$SocialDataFormType(model.socialForm),
												model.routeAcronym,
												model.routeId),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											keysDown: {ctor: '[]'},
											socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm)
										}),
									{
										ctor: '::',
										_0: A3(
											_user$project$Command$sendInitialMessage,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Invalid ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$String$toUpper(model.routeAcronym),
													' Social')),
											'Invalid',
											_user$project$Model_ModelMisc$Failure),
										_1: {ctor: '[]'}
									});
							}
					}
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								keysDown: {ctor: '[]'}
							}),
						{
							ctor: '::',
							_0: A3(_user$project$Command$sendInitialMessage, 'THIS SHOULD NEVER HAPPEN', 'THIS SHOULD NEVER HAPPEN', _user$project$Model_ModelMisc$Begin),
							_1: {ctor: '[]'}
						});
				}
			default:
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							keysDown: {ctor: '[]'}
						}),
					{
						ctor: '::',
						_0: A3(_user$project$Command$sendInitialMessage, 'Non Existent Command', 'Does Not Exist', _user$project$Model_ModelMisc$NonExistent),
						_1: {ctor: '[]'}
					});
		}
	});

var _user$project$View$notFoundView = A2(
	_elm_lang$html$Html$div,
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _elm_lang$html$Html$text('Not found'),
		_1: {ctor: '[]'}
	});
var _user$project$View$mainModule = function (model) {
	var _p0 = model.route;
	switch (_p0.ctor) {
		case 'IndexRoute':
			return _user$project$Component_Main_OverviewComponent$overviewComponent(model);
		case 'OverviewRoute':
			return _user$project$Component_Main_OverviewComponent$overviewComponent(model);
		case 'BuildRoute':
			return _user$project$Component_Main_BuildComponent$buildComponent(model);
		case 'DevelopmentRoute':
			return _user$project$Component_Main_DevelopmentComponent$developmentComponent(model);
		case 'ConfigRoute':
			return _user$project$Component_Main_ConfigComponent$configComponent(model);
		case 'WebsiteRoute':
			return A5(_user$project$Component_Websites_MainComponent$websitesComponent, model, _p0._0, 'products', 'index', 'null');
		case 'WebsiteNestedRoute':
			return A5(_user$project$Component_Websites_MainComponent$websitesComponent, model, _p0._0, _p0._1, _p0._2, 'null');
		case 'WebsiteNestedRouteShowEdit':
			return A5(_user$project$Component_Websites_MainComponent$websitesComponent, model, _p0._0, _p0._1, _p0._2, _p0._3);
		default:
			return _user$project$View$notFoundView;
	}
};
var _user$project$View$showKeyboardHelper = function (model) {
	var _p1 = model.showKeyboardHelper;
	if (_p1 === true) {
		return _user$project$Component_KeyboardHelperComponent$keyboardHelperComponent(model);
	} else {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{ctor: '[]'});
	}
};
var _user$project$View$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('view__container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$View$showKeyboardHelper(model),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('top__container'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _user$project$Component_NavbarComponent$navbarComponent(model),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('bottom__container'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('bottom__left__container'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _user$project$View$mainModule(model),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _user$project$Component_ConsoleComponent$consoleComponent(model),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _user$project$Model_ModelForm$setC7Icon = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c7_icon: $new});
	});
var _user$project$Model_ModelForm$asC7IconIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC7Icon);
var _user$project$Model_ModelForm$setC7Model = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c7_model: $new});
	});
var _user$project$Model_ModelForm$asC7ModelIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC7Model);
var _user$project$Model_ModelForm$setC7DisplayName = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c7_display_name: $new});
	});
var _user$project$Model_ModelForm$asC7DisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC7DisplayName);
var _user$project$Model_ModelForm$setC7Name = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c7_name: $new});
	});
var _user$project$Model_ModelForm$asC7NameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC7Name);
var _user$project$Model_ModelForm$setC5Icon = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c5_icon: $new});
	});
var _user$project$Model_ModelForm$asC5IconIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC5Icon);
var _user$project$Model_ModelForm$setC5Model = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c5_model: $new});
	});
var _user$project$Model_ModelForm$asC5ModelIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC5Model);
var _user$project$Model_ModelForm$setC5DisplayName = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c5_display_name: $new});
	});
var _user$project$Model_ModelForm$asC5DisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC5DisplayName);
var _user$project$Model_ModelForm$setC5Name = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c5_name: $new});
	});
var _user$project$Model_ModelForm$asC5NameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC5Name);
var _user$project$Model_ModelForm$setC3Icon = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c3_icon: $new});
	});
var _user$project$Model_ModelForm$asC3IconIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC3Icon);
var _user$project$Model_ModelForm$setC3Model = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c3_model: $new});
	});
var _user$project$Model_ModelForm$asC3ModelIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC3Model);
var _user$project$Model_ModelForm$setC3DisplayName = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c3_display_name: $new});
	});
var _user$project$Model_ModelForm$asC3DisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC3DisplayName);
var _user$project$Model_ModelForm$setC3Name = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c3_name: $new});
	});
var _user$project$Model_ModelForm$asC3NameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC3Name);
var _user$project$Model_ModelForm$setC1Icon = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c1_icon: $new});
	});
var _user$project$Model_ModelForm$asC1IconIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC1Icon);
var _user$project$Model_ModelForm$setC1Model = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c1_model: $new});
	});
var _user$project$Model_ModelForm$asC1ModelIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC1Model);
var _user$project$Model_ModelForm$setC1DisplayName = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c1_display_name: $new});
	});
var _user$project$Model_ModelForm$asC1DisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC1DisplayName);
var _user$project$Model_ModelForm$setC1Name = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c1_name: $new});
	});
var _user$project$Model_ModelForm$asC1NameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC1Name);
var _user$project$Model_ModelForm$setC6Icon = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c6_icon: $new});
	});
var _user$project$Model_ModelForm$asC6IconIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC6Icon);
var _user$project$Model_ModelForm$setC6Model = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c6_model: $new});
	});
var _user$project$Model_ModelForm$asC6ModelIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC6Model);
var _user$project$Model_ModelForm$setC6DisplayName = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c6_display_name: $new});
	});
var _user$project$Model_ModelForm$asC6DisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC6DisplayName);
var _user$project$Model_ModelForm$setC6Name = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c6_name: $new});
	});
var _user$project$Model_ModelForm$asC6NameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC6Name);
var _user$project$Model_ModelForm$setC4Icon = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c4_icon: $new});
	});
var _user$project$Model_ModelForm$asC4IconIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC4Icon);
var _user$project$Model_ModelForm$setC4Model = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c4_model: $new});
	});
var _user$project$Model_ModelForm$asC4ModelIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC4Model);
var _user$project$Model_ModelForm$setC4DisplayName = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c4_display_name: $new});
	});
var _user$project$Model_ModelForm$asC4DisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC4DisplayName);
var _user$project$Model_ModelForm$setC4Name = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c4_name: $new});
	});
var _user$project$Model_ModelForm$asC4NameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC4Name);
var _user$project$Model_ModelForm$setC2Icon = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c2_icon: $new});
	});
var _user$project$Model_ModelForm$asC2IconIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC2Icon);
var _user$project$Model_ModelForm$setC2Model = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c2_model: $new});
	});
var _user$project$Model_ModelForm$asC2ModelIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC2Model);
var _user$project$Model_ModelForm$setC2DisplayName = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c2_display_name: $new});
	});
var _user$project$Model_ModelForm$asC2DisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC2DisplayName);
var _user$project$Model_ModelForm$setC2Name = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{c2_name: $new});
	});
var _user$project$Model_ModelForm$asC2NameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setC2Name);
var _user$project$Model_ModelForm$setNumOfCategories = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{num_of_categories: $new});
	});
var _user$project$Model_ModelForm$asNumOfCategoriesIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setNumOfCategories);
var _user$project$Model_ModelForm$setWebsiteCapital = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{website_capital: $new});
	});
var _user$project$Model_ModelForm$asWebsiteCapitalIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setWebsiteCapital);
var _user$project$Model_ModelForm$setWebsiteLower = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{website_lower: $new});
	});
var _user$project$Model_ModelForm$asWebsiteLowerIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setWebsiteLower);
var _user$project$Model_ModelForm$setWebsiteAcronym = F2(
	function ($new, buildForm) {
		return _elm_lang$core$Native_Utils.update(
			buildForm,
			{website_acronym: $new});
	});
var _user$project$Model_ModelForm$asWebsiteAcronymIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setWebsiteAcronym);
var _user$project$Model_ModelForm$setConfigFormPassword = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{password: $new});
	});
var _user$project$Model_ModelForm$asConfigFormPasswordIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormPassword);
var _user$project$Model_ModelForm$setConfigFormPrimaryEmail = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{primary_email: $new});
	});
var _user$project$Model_ModelForm$asConfigFormPrimaryEmailIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormPrimaryEmail);
var _user$project$Model_ModelForm$setConfigFormGoogleSiteVerification = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{google_site_verification: $new});
	});
var _user$project$Model_ModelForm$asConfigFormGoogleSiteVerificationIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormGoogleSiteVerification);
var _user$project$Model_ModelForm$setConfigFormGoogleAnalyticsTrackingId = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{google_analytics_tracking_id: $new});
	});
var _user$project$Model_ModelForm$asConfigFormGoogleAnalyticsTrackingIdIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormGoogleAnalyticsTrackingId);
var _user$project$Model_ModelForm$setConfigFormWebsiteFavicon = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_favicon: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteFaviconIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteFavicon);
var _user$project$Model_ModelForm$setConfigFormWebsiteLogoSvg = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_logo_svg: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteLogoSvgIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteLogoSvg);
var _user$project$Model_ModelForm$setConfigFormWebsiteLogoPng = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_logo_png: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteLogoPngIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteLogoPng);
var _user$project$Model_ModelForm$setConfigFormWebsiteDomain = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_domain: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteDomainIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteDomain);
var _user$project$Model_ModelForm$setConfigFormWebsiteNameLower = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_name_lower: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteNameLowerIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteNameLower);
var _user$project$Model_ModelForm$setConfigFormWebsiteName = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_name: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteName);
var _user$project$Model_ModelForm$setConfigFormWebsiteAcronym = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_acronym: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteAcronymIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteAcronym);
var _user$project$Model_ModelForm$setConfigFormLetterCopy = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{letter_copy: $new});
	});
var _user$project$Model_ModelForm$asConfigFormLetterCopyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormLetterCopy);
var _user$project$Model_ModelForm$setConfigFormSubmitCopy = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{submit_copy: $new});
	});
var _user$project$Model_ModelForm$asConfigFormSubmitCopyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormSubmitCopy);
var _user$project$Model_ModelForm$setConfigFormAboutCopy = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{about_copy: $new});
	});
var _user$project$Model_ModelForm$asConfigFormAboutCopyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormAboutCopy);
var _user$project$Model_ModelForm$setConfigFormSearchMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{search_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormSearchMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormSearchMetaDescription);
var _user$project$Model_ModelForm$setConfigFormRegisterMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{register_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormRegisterMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormRegisterMetaDescription);
var _user$project$Model_ModelForm$setConfigFormLoginMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{login_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormLoginMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormLoginMetaDescription);
var _user$project$Model_ModelForm$setConfigFormSubmitMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{submit_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormSubmitMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormSubmitMetaDescription);
var _user$project$Model_ModelForm$setConfigFormContactMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{contact_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormContactMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormContactMetaDescription);
var _user$project$Model_ModelForm$setConfigFormAboutMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{about_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormAboutMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormAboutMetaDescription);
var _user$project$Model_ModelForm$setConfigFormUpdatesMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{updates_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormUpdatesMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormUpdatesMetaDescription);
var _user$project$Model_ModelForm$setConfigFormCategoriesMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{categories_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormCategoriesMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormCategoriesMetaDescription);
var _user$project$Model_ModelForm$setConfigFormBlogMetaDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{blog_meta_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormBlogMetaDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormBlogMetaDescription);
var _user$project$Model_ModelForm$setConfigFormWebsiteAltImage = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_alt_image: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteAltImageIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteAltImage);
var _user$project$Model_ModelForm$setConfigFormWebsiteTwitter = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_twitter: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteTwitterIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteTwitter);
var _user$project$Model_ModelForm$setConfigFormWebsiteKeywords = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_keywords: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteKeywordsIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteKeywords);
var _user$project$Model_ModelForm$setConfigFormWebsiteDescription = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_description: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteDescription);
var _user$project$Model_ModelForm$setConfigFormWebsiteTitle = F2(
	function ($new, configEnvData) {
		return _elm_lang$core$Native_Utils.update(
			configEnvData,
			{website_title: $new});
	});
var _user$project$Model_ModelForm$asConfigFormWebsiteTitleIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigFormWebsiteTitle);
var _user$project$Model_ModelForm$setIndividualEnvFormPintrestSecretKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{pintrest_secret_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormPintrestSecretKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormPintrestSecretKey);
var _user$project$Model_ModelForm$setIndividualEnvFormPintrestApiKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{pintrest_api_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormPintrestApiKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormPintrestApiKey);
var _user$project$Model_ModelForm$setIndividualEnvFormTumblrBlogIdentifier = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{tumblr_blog_identifier: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormTumblrBlogIdentifierIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormTumblrBlogIdentifier);
var _user$project$Model_ModelForm$setIndividualEnvFormTumblrSecretKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{tumblr_secret_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormTumblrSecretKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormTumblrSecretKey);
var _user$project$Model_ModelForm$setIndividualEnvFormTumblrApiKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{tumblr_api_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormTumblrApiKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormTumblrApiKey);
var _user$project$Model_ModelForm$setIndividualEnvFormFacebookRedirectUrl = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{facebook_redirect_url: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormFacebookRedirectUrlIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormFacebookRedirectUrl);
var _user$project$Model_ModelForm$setIndividualEnvFormFacebookPageId = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{facebook_page_id: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormFacebookPageIdIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormFacebookPageId);
var _user$project$Model_ModelForm$setIndividualEnvFormFacebookSecretKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{facebook_secret_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormFacebookSecretKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormFacebookSecretKey);
var _user$project$Model_ModelForm$setIndividualEnvFormFacebookApiKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{facebook_api_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormFacebookApiKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormFacebookApiKey);
var _user$project$Model_ModelForm$setIndividualEnvFormTwitterAccessTokenSecret = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{twitter_access_token_secret: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormTwitterAccessTokenSecretIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormTwitterAccessTokenSecret);
var _user$project$Model_ModelForm$setIndividualEnvFormTwitterAccessToken = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{twitter_access_token: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormTwitterAccessTokenIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormTwitterAccessToken);
var _user$project$Model_ModelForm$setIndividualEnvFormTwitterSecretKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{twitter_secret_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormTwitterSecretKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormTwitterSecretKey);
var _user$project$Model_ModelForm$setIndividualEnvFormTwitterApiKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{twitter_api_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormTwitterApiKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormTwitterApiKey);
var _user$project$Model_ModelForm$setIndividualEnvFormRecaptchaPrivateKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{recaptcha_private_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormRecaptchaPrivateKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormRecaptchaPrivateKey);
var _user$project$Model_ModelForm$setIndividualEnvFormRecaptchaPublicKey = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{recaptcha_public_key: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormRecaptchaPublicKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormRecaptchaPublicKey);
var _user$project$Model_ModelForm$setIndividualEnvFormAmazonS3BucketName = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{amazon_s3_bucket_name: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormAmazonS3BucketNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormAmazonS3BucketName);
var _user$project$Model_ModelForm$setIndividualEnvFormMailgunDomain = F2(
	function ($new, individualEnv) {
		return _elm_lang$core$Native_Utils.update(
			individualEnv,
			{mailgun_domain: $new});
	});
var _user$project$Model_ModelForm$asIndividualEnvFormMailgunDomainIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvFormMailgunDomain);
var _user$project$Model_ModelForm$setCommonEnvFormTumblrAccessTokenSecret = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{tumblr_access_token_secret: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormTumblrAccessTokenSecretIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormTumblrAccessTokenSecret);
var _user$project$Model_ModelForm$setCommonEnvFormTumblrAccessToken = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{tumblr_access_token: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormTumblrAccessTokenIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormTumblrAccessToken);
var _user$project$Model_ModelForm$setCommonEnvFormEtsySecretKey = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{etsy_secret_key: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormEtsySecretKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormEtsySecretKey);
var _user$project$Model_ModelForm$setCommonEnvFormEtsyApiKey = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{etsy_api_key: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormEtsyApiKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormEtsyApiKey);
var _user$project$Model_ModelForm$setCommonEnvFormAmazonS3SecretAccessKey = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{amazon_s3_secret_access_key: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormAmazonS3SecretAccessKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormAmazonS3SecretAccessKey);
var _user$project$Model_ModelForm$setCommonEnvFormAmazonS3AccessKey = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{amazon_s3_access_key: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormAmazonS3AccessKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormAmazonS3AccessKey);
var _user$project$Model_ModelForm$setCommonEnvFormMarketplaceHost = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{marketplace_host: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormMarketplaceHostIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormMarketplaceHost);
var _user$project$Model_ModelForm$setCommonEnvFormAwsSecretAccessKey = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{aws_secret_access_key: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormAwsSecretAccessKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormAwsSecretAccessKey);
var _user$project$Model_ModelForm$setCommonEnvFormAwsAccessKeyId = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{aws_access_key_id: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormAwsAccessKeyIdIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormAwsAccessKeyId);
var _user$project$Model_ModelForm$setCommonEnvFormAmazonAssociateTag = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{amazon_associate_tag: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormAmazonAssociateTagIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormAmazonAssociateTag);
var _user$project$Model_ModelForm$setCommonEnvFormMailgunKey = F2(
	function ($new, commonEnv) {
		return _elm_lang$core$Native_Utils.update(
			commonEnv,
			{mailgun_key: $new});
	});
var _user$project$Model_ModelForm$asCommonEnvFormMailgunKeyIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvFormMailgunKey);
var _user$project$Model_ModelForm$setUpdateFormAuthor = F2(
	function ($new, newUpdates) {
		return _elm_lang$core$Native_Utils.update(
			newUpdates,
			{author: $new});
	});
var _user$project$Model_ModelForm$asUpdateFormAuthorIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setUpdateFormAuthor);
var _user$project$Model_ModelForm$setUpdateFormExcerpt = F2(
	function ($new, newUpdates) {
		return _elm_lang$core$Native_Utils.update(
			newUpdates,
			{excerpt: $new});
	});
var _user$project$Model_ModelForm$asUpdateFormExcerptIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setUpdateFormExcerpt);
var _user$project$Model_ModelForm$setUpdateFormTitle = F2(
	function ($new, newUpdates) {
		return _elm_lang$core$Native_Utils.update(
			newUpdates,
			{title: $new});
	});
var _user$project$Model_ModelForm$asUpdateFormTitleIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setUpdateFormTitle);
var _user$project$Model_ModelForm$setUpdateFormDisplayName = F2(
	function ($new, newUpdates) {
		return _elm_lang$core$Native_Utils.update(
			newUpdates,
			{display_name: $new});
	});
var _user$project$Model_ModelForm$asUpdateFormDisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setUpdateFormDisplayName);
var _user$project$Model_ModelForm$setTagFormDescription = F2(
	function ($new, newTags) {
		return _elm_lang$core$Native_Utils.update(
			newTags,
			{description: $new});
	});
var _user$project$Model_ModelForm$asTagFormDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setTagFormDescription);
var _user$project$Model_ModelForm$setTagFormDisplayName = F2(
	function ($new, newTags) {
		return _elm_lang$core$Native_Utils.update(
			newTags,
			{display_name: $new});
	});
var _user$project$Model_ModelForm$asTagFormDisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setTagFormDisplayName);
var _user$project$Model_ModelForm$setSocialFormSocialMediaType = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{social_media_type: $new});
	});
var _user$project$Model_ModelForm$asSocialFormSocialMediaTypeIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormSocialMediaType);
var _user$project$Model_ModelForm$setSocialFormImageCaption = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{image_caption: $new});
	});
var _user$project$Model_ModelForm$asSocialFormImageCaptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormImageCaption);
var _user$project$Model_ModelForm$setSocialFormUrl = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{url: $new});
	});
var _user$project$Model_ModelForm$asSocialFormUrlIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormUrl);
var _user$project$Model_ModelForm$setSocialFormFeaturedImage = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{featured_image: $new});
	});
var _user$project$Model_ModelForm$asSocialFormFeaturedImageIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormFeaturedImage);
var _user$project$Model_ModelForm$setSocialFormFacebookCode = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{facebook_code: $new});
	});
var _user$project$Model_ModelForm$asSocialFormFacebookCodeIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormFacebookCode);
var _user$project$Model_ModelForm$setSocialFormDraft = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{draft: !newSocial.draft});
	});
var _user$project$Model_ModelForm$asSocialFormDraftIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormDraft);
var _user$project$Model_ModelForm$setSocialFormTags = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{tags: $new});
	});
var _user$project$Model_ModelForm$asSocialFormTagsIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormTags);
var _user$project$Model_ModelForm$setSocialFormDescription = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{description: $new});
	});
var _user$project$Model_ModelForm$asSocialFormDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormDescription);
var _user$project$Model_ModelForm$setSocialFormDisplayName = F2(
	function ($new, newSocial) {
		return _elm_lang$core$Native_Utils.update(
			newSocial,
			{display_name: $new});
	});
var _user$project$Model_ModelForm$asSocialFormDisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialFormDisplayName);
var _user$project$Model_ModelForm$setPostFormProductOffset = F2(
	function ($new, newPosts) {
		return _elm_lang$core$Native_Utils.update(
			newPosts,
			{product_offset: $new});
	});
var _user$project$Model_ModelForm$asPostFormProductOffsetIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostFormProductOffset);
var _user$project$Model_ModelForm$setPostFormProductLimit = F2(
	function ($new, newPosts) {
		return _elm_lang$core$Native_Utils.update(
			newPosts,
			{product_limit: $new});
	});
var _user$project$Model_ModelForm$asPostFormProductLimitIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostFormProductLimit);
var _user$project$Model_ModelForm$setPostFormTag = F2(
	function ($new, newPosts) {
		return _elm_lang$core$Native_Utils.update(
			newPosts,
			{tag: $new});
	});
var _user$project$Model_ModelForm$asPostFormTagIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostFormTag);
var _user$project$Model_ModelForm$setPostFormPostType = F2(
	function ($new, newPosts) {
		return _elm_lang$core$Native_Utils.update(
			newPosts,
			{post_type: $new});
	});
var _user$project$Model_ModelForm$asPostFormPostTypeIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostFormPostType);
var _user$project$Model_ModelForm$setPostFormFeaturedImage = F2(
	function ($new, newPosts) {
		return _elm_lang$core$Native_Utils.update(
			newPosts,
			{featured_image: $new});
	});
var _user$project$Model_ModelForm$asPostFormFeaturedImageIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostFormFeaturedImage);
var _user$project$Model_ModelForm$setPostFormExcerpt = F2(
	function ($new, newPosts) {
		return _elm_lang$core$Native_Utils.update(
			newPosts,
			{excerpt: $new});
	});
var _user$project$Model_ModelForm$asPostFormExcerptIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostFormExcerpt);
var _user$project$Model_ModelForm$setPostFormAuthor = F2(
	function ($new, newPosts) {
		return _elm_lang$core$Native_Utils.update(
			newPosts,
			{author: $new});
	});
var _user$project$Model_ModelForm$asPostFormAuthorIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostFormAuthor);
var _user$project$Model_ModelForm$setPostFormDisplayName = F2(
	function ($new, newPosts) {
		return _elm_lang$core$Native_Utils.update(
			newPosts,
			{display_name: $new});
	});
var _user$project$Model_ModelForm$asPostFormDisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostFormDisplayName);
var _user$project$Model_ModelForm$setProductFormProductType = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{product_type: $new});
	});
var _user$project$Model_ModelForm$asProductFormProductTypeIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormProductType);
var _user$project$Model_ModelForm$setProductFormLikeTotal = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{product_like: $new});
	});
var _user$project$Model_ModelForm$asProductFormLikeTotalIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormLikeTotal);
var _user$project$Model_ModelForm$setProductFormCta = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{cta: $new});
	});
var _user$project$Model_ModelForm$asProductFormCtaIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormCta);
var _user$project$Model_ModelForm$setProductFormPrice = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{price: $new});
	});
var _user$project$Model_ModelForm$asProductFormPriceIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormPrice);
var _user$project$Model_ModelForm$setProductFormFeaturedImage = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{featured_image: $new});
	});
var _user$project$Model_ModelForm$asProductFormFeaturedImageIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormFeaturedImage);
var _user$project$Model_ModelForm$setProductFormUrlText = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{url_text: $new});
	});
var _user$project$Model_ModelForm$asProductFormUrlTextIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormUrlText);
var _user$project$Model_ModelForm$setProductFormUrl = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{url: $new});
	});
var _user$project$Model_ModelForm$asProductFormUrlIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormUrl);
var _user$project$Model_ModelForm$setProductFormOriginalFeaturedImage = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{original_featured_image: $new});
	});
var _user$project$Model_ModelForm$asProductFormOriginalFeaturedImageIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormOriginalFeaturedImage);
var _user$project$Model_ModelForm$setProductFormCategory = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{category_id: $new});
	});
var _user$project$Model_ModelForm$asProductFormCategoryIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormCategory);
var _user$project$Model_ModelForm$setProductFormScheduleDate = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{schedule_date: $new});
	});
var _user$project$Model_ModelForm$asProductFormScheduleDateIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormScheduleDate);
var _user$project$Model_ModelForm$setProductFormDraft = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{draft: !newProducts.draft});
	});
var _user$project$Model_ModelForm$asProductFormDraftIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormDraft);
var _user$project$Model_ModelForm$setProductFormBlogDescription = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{blog_description: $new});
	});
var _user$project$Model_ModelForm$asProductFormBlogDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormBlogDescription);
var _user$project$Model_ModelForm$setProductFormDescription = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{description: $new});
	});
var _user$project$Model_ModelForm$asProductFormDescriptionIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormDescription);
var _user$project$Model_ModelForm$setProductFormDisplayName = F2(
	function ($new, newProducts) {
		return _elm_lang$core$Native_Utils.update(
			newProducts,
			{display_name: $new});
	});
var _user$project$Model_ModelForm$asProductFormDisplayNameIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductFormDisplayName);
var _user$project$Model_ModelForm$setUpdateForm = F2(
	function (newUpdates, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{updateForm: newUpdates});
	});
var _user$project$Model_ModelForm$asUpdateFormIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setUpdateForm);
var _user$project$Model_ModelForm$setTagForm = F2(
	function (newTags, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{tagForm: newTags});
	});
var _user$project$Model_ModelForm$asTagFormIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setTagForm);
var _user$project$Model_ModelForm$setSocialForm = F2(
	function (newSocial, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{socialForm: newSocial});
	});
var _user$project$Model_ModelForm$asSocialFormIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setSocialForm);
var _user$project$Model_ModelForm$setPostForm = F2(
	function (newPosts, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{postForm: newPosts});
	});
var _user$project$Model_ModelForm$asPostFormIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setPostForm);
var _user$project$Model_ModelForm$setProductForm = F2(
	function (newProducts, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{productForm: newProducts});
	});
var _user$project$Model_ModelForm$asProductFormIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setProductForm);
var _user$project$Model_ModelForm$setBuildForm = F2(
	function (newProducts, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{buildForm: newProducts});
	});
var _user$project$Model_ModelForm$asBuildFormIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setBuildForm);
var _user$project$Model_ModelForm$setConfigForm = F2(
	function (newProducts, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{configEnvData: newProducts});
	});
var _user$project$Model_ModelForm$asConfigFormIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setConfigForm);
var _user$project$Model_ModelForm$setIndividualEnvData = F2(
	function (individualEnvData, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{individualEnvData: individualEnvData});
	});
var _user$project$Model_ModelForm$asIndividualEnvDataIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setIndividualEnvData);
var _user$project$Model_ModelForm$setCommonEnvData = F2(
	function (commonEnvData, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{commonEnvData: commonEnvData});
	});
var _user$project$Model_ModelForm$asCommonEnvDataIn = _elm_lang$core$Basics$flip(_user$project$Model_ModelForm$setCommonEnvData);
var _user$project$Model_ModelForm$setUpdatesField = F3(
	function (model, field, value) {
		var _p0 = field;
		switch (_p0.ctor) {
			case 'UpdateFormDisplayName':
				return A2(
					_user$project$Model_ModelForm$asUpdateFormIn,
					model,
					A2(_user$project$Model_ModelForm$asUpdateFormDisplayNameIn, model.updateForm, value));
			case 'UpdateFormTitle':
				return A2(
					_user$project$Model_ModelForm$asUpdateFormIn,
					model,
					A2(_user$project$Model_ModelForm$asUpdateFormTitleIn, model.updateForm, value));
			case 'UpdateFormExcerpt':
				return A2(
					_user$project$Model_ModelForm$asUpdateFormIn,
					model,
					A2(_user$project$Model_ModelForm$asUpdateFormExcerptIn, model.updateForm, value));
			case 'UpdateFormAuthor':
				return A2(
					_user$project$Model_ModelForm$asUpdateFormIn,
					model,
					A2(_user$project$Model_ModelForm$asUpdateFormAuthorIn, model.updateForm, value));
			default:
				return model;
		}
	});
var _user$project$Model_ModelForm$setTagsField = F3(
	function (model, field, value) {
		var _p1 = field;
		switch (_p1.ctor) {
			case 'TagFormDisplayName':
				return A2(
					_user$project$Model_ModelForm$asTagFormIn,
					model,
					A2(_user$project$Model_ModelForm$asTagFormDisplayNameIn, model.tagForm, value));
			case 'TagFormDescription':
				return A2(
					_user$project$Model_ModelForm$asTagFormIn,
					model,
					A2(_user$project$Model_ModelForm$asTagFormDescriptionIn, model.tagForm, value));
			default:
				return model;
		}
	});
var _user$project$Model_ModelForm$setSocialBoolField = F3(
	function (model, field, value) {
		var _p2 = field;
		if (_p2.ctor === 'SocialFormDraft') {
			return A2(
				_user$project$Model_ModelForm$asSocialFormIn,
				model,
				A2(_user$project$Model_ModelForm$asSocialFormDraftIn, model.socialForm, value));
		} else {
			return model;
		}
	});
var _user$project$Model_ModelForm$setSocialStringField = F3(
	function (model, field, value) {
		var _p3 = field;
		switch (_p3.ctor) {
			case 'SocialFormDisplayName':
				return A2(
					_user$project$Model_ModelForm$asSocialFormIn,
					model,
					A2(_user$project$Model_ModelForm$asSocialFormDisplayNameIn, model.socialForm, value));
			case 'SocialFormDescription':
				return A2(
					_user$project$Model_ModelForm$asSocialFormIn,
					model,
					A2(_user$project$Model_ModelForm$asSocialFormDescriptionIn, model.socialForm, value));
			case 'SocialFormTags':
				return A2(
					_user$project$Model_ModelForm$asSocialFormIn,
					model,
					A2(_user$project$Model_ModelForm$asSocialFormTagsIn, model.socialForm, value));
			case 'SocialFormFacebookCode':
				return A2(
					_user$project$Model_ModelForm$asSocialFormIn,
					model,
					A2(_user$project$Model_ModelForm$asSocialFormFacebookCodeIn, model.socialForm, value));
			case 'SocialFormFeaturedImage':
				return A2(
					_user$project$Model_ModelForm$asSocialFormIn,
					model,
					A2(_user$project$Model_ModelForm$asSocialFormFeaturedImageIn, model.socialForm, value));
			case 'SocialFormUrl':
				return A2(
					_user$project$Model_ModelForm$asSocialFormIn,
					model,
					A2(_user$project$Model_ModelForm$asSocialFormUrlIn, model.socialForm, value));
			case 'SocialFormImageCaption':
				return A2(
					_user$project$Model_ModelForm$asSocialFormIn,
					model,
					A2(_user$project$Model_ModelForm$asSocialFormImageCaptionIn, model.socialForm, value));
			case 'SocialFormSocialMediaType':
				return A2(
					_user$project$Model_ModelForm$asSocialFormIn,
					model,
					A2(_user$project$Model_ModelForm$asSocialFormSocialMediaTypeIn, model.socialForm, value));
			default:
				return model;
		}
	});
var _user$project$Model_ModelForm$setPostsTagField = F3(
	function (model, field, value) {
		var _p4 = field;
		if (_p4.ctor === 'PostFormTag') {
			return A2(
				_user$project$Model_ModelForm$asPostFormIn,
				model,
				A2(_user$project$Model_ModelForm$asPostFormTagIn, model.postForm, value));
		} else {
			return model;
		}
	});
var _user$project$Model_ModelForm$setPostsIntField = F3(
	function (model, field, value) {
		var _p5 = value;
		if (_p5.ctor === 'Ok') {
			var _p7 = _p5._0;
			var _p6 = field;
			switch (_p6.ctor) {
				case 'PostFormProductLimit':
					return A2(
						_user$project$Model_ModelForm$asPostFormIn,
						model,
						A2(
							_user$project$Model_ModelForm$asPostFormProductLimitIn,
							model.postForm,
							_elm_lang$core$Maybe$Just(_p7)));
				case 'PostFormProductOffset':
					return A2(
						_user$project$Model_ModelForm$asPostFormIn,
						model,
						A2(
							_user$project$Model_ModelForm$asPostFormProductOffsetIn,
							model.postForm,
							_elm_lang$core$Maybe$Just(_p7)));
				default:
					return model;
			}
		} else {
			return model;
		}
	});
var _user$project$Model_ModelForm$setPostsStringField = F3(
	function (model, field, value) {
		var _p8 = field;
		switch (_p8.ctor) {
			case 'PostFormDisplayName':
				return A2(
					_user$project$Model_ModelForm$asPostFormIn,
					model,
					A2(_user$project$Model_ModelForm$asPostFormDisplayNameIn, model.postForm, value));
			case 'PostFormAuthor':
				return A2(
					_user$project$Model_ModelForm$asPostFormIn,
					model,
					A2(_user$project$Model_ModelForm$asPostFormAuthorIn, model.postForm, value));
			case 'PostFormExcerpt':
				return A2(
					_user$project$Model_ModelForm$asPostFormIn,
					model,
					A2(_user$project$Model_ModelForm$asPostFormExcerptIn, model.postForm, value));
			case 'PostFormPostType':
				return A2(
					_user$project$Model_ModelForm$asPostFormIn,
					model,
					A2(_user$project$Model_ModelForm$asPostFormPostTypeIn, model.postForm, value));
			case 'PostFormFeaturedImage':
				return A2(
					_user$project$Model_ModelForm$asPostFormIn,
					model,
					A2(_user$project$Model_ModelForm$asPostFormFeaturedImageIn, model.postForm, value));
			default:
				return model;
		}
	});
var _user$project$Model_ModelForm$setProductsCategoryIdField = F3(
	function (model, field, value) {
		var _p9 = field;
		if (_p9.ctor === 'ProductFormCategory') {
			return A2(
				_user$project$Model_ModelForm$asProductFormIn,
				model,
				A2(_user$project$Model_ModelForm$asProductFormCategoryIn, model.productForm, value));
		} else {
			return model;
		}
	});
var _user$project$Model_ModelForm$setProductsFloatField = F3(
	function (model, field, value) {
		var _p10 = value;
		if (_p10.ctor === 'Ok') {
			var _p11 = field;
			if (_p11.ctor === 'ProductFormPrice') {
				return A2(
					_user$project$Model_ModelForm$asProductFormIn,
					model,
					A2(_user$project$Model_ModelForm$asProductFormPriceIn, model.productForm, _p10._0));
			} else {
				return model;
			}
		} else {
			return model;
		}
	});
var _user$project$Model_ModelForm$setProductsIntField = F3(
	function (model, field, value) {
		var _p12 = value;
		if (_p12.ctor === 'Ok') {
			var _p13 = field;
			if (_p13.ctor === 'ProductFormLikeTotal') {
				return A2(
					_user$project$Model_ModelForm$asProductFormIn,
					model,
					A2(_user$project$Model_ModelForm$asProductFormLikeTotalIn, model.productForm, _p12._0));
			} else {
				return model;
			}
		} else {
			return model;
		}
	});
var _user$project$Model_ModelForm$setProductsBoolField = F3(
	function (model, field, value) {
		var _p14 = field;
		if (_p14.ctor === 'ProductFormDraft') {
			return A2(
				_user$project$Model_ModelForm$asProductFormIn,
				model,
				A2(_user$project$Model_ModelForm$asProductFormDraftIn, model.productForm, value));
		} else {
			return model;
		}
	});
var _user$project$Model_ModelForm$setProductsStringField = F3(
	function (model, field, value) {
		var _p15 = field;
		switch (_p15.ctor) {
			case 'ProductFormDisplayName':
				var input_count = A2(
					F2(
						function (x, y) {
							return x - y;
						}),
					35,
					_elm_lang$core$String$length(value));
				var productForm = model.productForm;
				var newProductForm = _elm_lang$core$Native_Utils.update(
					productForm,
					{display_name: value});
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						productForm: newProductForm,
						productFormDisplayNameCount: _elm_lang$core$Maybe$Just(input_count)
					});
			case 'ProductFormDescription':
				var input_count = A2(
					F2(
						function (x, y) {
							return x - y;
						}),
					90,
					_elm_lang$core$String$length(value));
				var productForm = model.productForm;
				var newProductForm = _elm_lang$core$Native_Utils.update(
					productForm,
					{description: value});
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						productForm: newProductForm,
						productFormDescriptionCount: _elm_lang$core$Maybe$Just(input_count)
					});
			case 'ProductFormBlogDescription':
				var input_count = A2(
					F2(
						function (x, y) {
							return x - y;
						}),
					90,
					_elm_lang$core$String$length(value));
				var productForm = model.productForm;
				var newProductForm = _elm_lang$core$Native_Utils.update(
					productForm,
					{blog_description: value});
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						productForm: newProductForm,
						productFormBlogDescriptionCount: _elm_lang$core$Maybe$Just(input_count)
					});
			case 'ProductFormOriginalFeaturedImage':
				return A2(
					_user$project$Model_ModelForm$asProductFormIn,
					model,
					A2(_user$project$Model_ModelForm$asProductFormOriginalFeaturedImageIn, model.productForm, value));
			case 'ProductFormUrl':
				return A2(
					_user$project$Model_ModelForm$asProductFormIn,
					model,
					A2(_user$project$Model_ModelForm$asProductFormUrlIn, model.productForm, value));
			case 'ProductFormUrlText':
				return A2(
					_user$project$Model_ModelForm$asProductFormIn,
					model,
					A2(_user$project$Model_ModelForm$asProductFormUrlTextIn, model.productForm, value));
			case 'ProductFormFeaturedImage':
				return A2(
					_user$project$Model_ModelForm$asProductFormIn,
					model,
					A2(_user$project$Model_ModelForm$asProductFormFeaturedImageIn, model.productForm, value));
			case 'ProductFormCta':
				return A2(
					_user$project$Model_ModelForm$asProductFormIn,
					model,
					A2(_user$project$Model_ModelForm$asProductFormCtaIn, model.productForm, value));
			case 'ProductFormProductType':
				return A2(
					_user$project$Model_ModelForm$asProductFormIn,
					model,
					A2(_user$project$Model_ModelForm$asProductFormProductTypeIn, model.productForm, value));
			default:
				return model;
		}
	});
var _user$project$Model_ModelForm$setConfigField = F3(
	function (model, field, value) {
		var _p16 = field;
		switch (_p16.ctor) {
			case 'ConfigFormWebsiteTitle':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteTitleIn, model.configEnvData, value));
			case 'ConfigFormWebsiteDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteDescriptionIn, model.configEnvData, value));
			case 'ConfigFormWebsiteKeywords':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteKeywordsIn, model.configEnvData, value));
			case 'ConfigFormWebsiteTwitter':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteTwitterIn, model.configEnvData, value));
			case 'ConfigFormWebsiteAltImage':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteAltImageIn, model.configEnvData, value));
			case 'ConfigFormBlogMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormBlogMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormCategoriesMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormCategoriesMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormUpdatesMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormUpdatesMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormAboutMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormAboutMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormContactMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormContactMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormSubmitMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormSubmitMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormLoginMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormLoginMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormRegisterMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormRegisterMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormSearchMetaDescription':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormSearchMetaDescriptionIn, model.configEnvData, value));
			case 'ConfigFormAboutCopy':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormAboutCopyIn, model.configEnvData, value));
			case 'ConfigFormSubmitCopy':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormSubmitCopyIn, model.configEnvData, value));
			case 'ConfigFormLetterCopy':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormLetterCopyIn, model.configEnvData, value));
			case 'ConfigFormWebsiteAcronym':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteAcronymIn, model.configEnvData, value));
			case 'ConfigFormWebsiteName':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteNameIn, model.configEnvData, value));
			case 'ConfigFormWebsiteNameLower':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteNameLowerIn, model.configEnvData, value));
			case 'ConfigFormWebsiteDomain':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteDomainIn, model.configEnvData, value));
			case 'ConfigFormWebsiteLogoPng':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteLogoPngIn, model.configEnvData, value));
			case 'ConfigFormWebsiteLogoSvg':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteLogoSvgIn, model.configEnvData, value));
			case 'ConfigFormWebsiteFavicon':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormWebsiteFaviconIn, model.configEnvData, value));
			case 'ConfigFormGoogleAnalyticsTrackingId':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormGoogleAnalyticsTrackingIdIn, model.configEnvData, value));
			case 'ConfigFormGoogleSiteVerification':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormGoogleSiteVerificationIn, model.configEnvData, value));
			case 'ConfigFormPrimaryEmail':
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormPrimaryEmailIn, model.configEnvData, value));
			default:
				return A2(
					_user$project$Model_ModelForm$asConfigFormIn,
					model,
					A2(_user$project$Model_ModelForm$asConfigFormPasswordIn, model.configEnvData, value));
		}
	});
var _user$project$Model_ModelForm$setIndividualEnvField = F3(
	function (model, field, value) {
		var _p17 = field;
		switch (_p17.ctor) {
			case 'IndividualEnvFormMailgunDomain':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormMailgunDomainIn, model.individualEnvData, value));
			case 'IndividualEnvFormAmazonS3BucketName':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormAmazonS3BucketNameIn, model.individualEnvData, value));
			case 'IndividualEnvFormRecaptchaPublicKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormRecaptchaPublicKeyIn, model.individualEnvData, value));
			case 'IndividualEnvFormRecaptchaPrivateKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormRecaptchaPrivateKeyIn, model.individualEnvData, value));
			case 'IndividualEnvFormTwitterApiKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormTwitterApiKeyIn, model.individualEnvData, value));
			case 'IndividualEnvFormTwitterSecretKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormTwitterSecretKeyIn, model.individualEnvData, value));
			case 'IndividualEnvFormTwitterAccessToken':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormTwitterAccessTokenIn, model.individualEnvData, value));
			case 'IndividualEnvFormTwitterAccessTokenSecret':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormTwitterAccessTokenSecretIn, model.individualEnvData, value));
			case 'IndividualEnvFormFacebookApiKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormFacebookApiKeyIn, model.individualEnvData, value));
			case 'IndividualEnvFormFacebookSecretKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormFacebookSecretKeyIn, model.individualEnvData, value));
			case 'IndividualEnvFormFacebookPageId':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormFacebookPageIdIn, model.individualEnvData, value));
			case 'IndividualEnvFormFacebookRedirectUrl':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormFacebookRedirectUrlIn, model.individualEnvData, value));
			case 'IndividualEnvFormTumblrApiKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormTumblrApiKeyIn, model.individualEnvData, value));
			case 'IndividualEnvFormTumblrSecretKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormTumblrSecretKeyIn, model.individualEnvData, value));
			case 'IndividualEnvFormTumblrBlogIdentifier':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormTumblrBlogIdentifierIn, model.individualEnvData, value));
			case 'IndividualEnvFormPintrestApiKey':
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormPintrestApiKeyIn, model.individualEnvData, value));
			default:
				return A2(
					_user$project$Model_ModelForm$asIndividualEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asIndividualEnvFormPintrestSecretKeyIn, model.individualEnvData, value));
		}
	});
var _user$project$Model_ModelForm$setCommonEnvField = F3(
	function (model, field, value) {
		var _p18 = field;
		switch (_p18.ctor) {
			case 'CommonEnvFormMailgunKey':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormMailgunKeyIn, model.commonEnvData, value));
			case 'CommonEnvFormAmazonAssociateTag':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormAmazonAssociateTagIn, model.commonEnvData, value));
			case 'CommonEnvFormAwsAccessKeyId':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormAwsAccessKeyIdIn, model.commonEnvData, value));
			case 'CommonEnvFormAwsSecretAccessKey':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormAwsSecretAccessKeyIn, model.commonEnvData, value));
			case 'CommonEnvFormMarketplaceHost':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormMarketplaceHostIn, model.commonEnvData, value));
			case 'CommonEnvFormAmazonS3AccessKey':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormAmazonS3AccessKeyIn, model.commonEnvData, value));
			case 'CommonEnvFormAmazonS3SecretAccessKey':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormAmazonS3SecretAccessKeyIn, model.commonEnvData, value));
			case 'CommonEnvFormEtsyApiKey':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormEtsyApiKeyIn, model.commonEnvData, value));
			case 'CommonEnvFormEtsySecretKey':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormEtsySecretKeyIn, model.commonEnvData, value));
			case 'CommonEnvFormTumblrAccessToken':
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormTumblrAccessTokenIn, model.commonEnvData, value));
			default:
				return A2(
					_user$project$Model_ModelForm$asCommonEnvDataIn,
					model,
					A2(_user$project$Model_ModelForm$asCommonEnvFormTumblrAccessTokenSecretIn, model.commonEnvData, value));
		}
	});
var _user$project$Model_ModelForm$setBuildField = F3(
	function (model, field, value) {
		var _p19 = field;
		switch (_p19.ctor) {
			case 'WebsiteAcronym':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asWebsiteAcronymIn, model.buildForm, value));
			case 'WebsiteLower':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asWebsiteLowerIn, model.buildForm, value));
			case 'WebsiteCapital':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asWebsiteCapitalIn, model.buildForm, value));
			case 'NumOfCategories':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asNumOfCategoriesIn, model.buildForm, value));
			case 'C2Name':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC2NameIn, model.buildForm, value));
			case 'C2DisplayName':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC2DisplayNameIn, model.buildForm, value));
			case 'C2Model':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC2ModelIn, model.buildForm, value));
			case 'C2Icon':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC2IconIn, model.buildForm, value));
			case 'C4Name':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC4NameIn, model.buildForm, value));
			case 'C4DisplayName':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC4DisplayNameIn, model.buildForm, value));
			case 'C4Model':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC4ModelIn, model.buildForm, value));
			case 'C4Icon':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC4IconIn, model.buildForm, value));
			case 'C6Name':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC6NameIn, model.buildForm, value));
			case 'C6DisplayName':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC6DisplayNameIn, model.buildForm, value));
			case 'C6Model':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC6ModelIn, model.buildForm, value));
			case 'C6Icon':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC6IconIn, model.buildForm, value));
			case 'C1Name':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC1NameIn, model.buildForm, value));
			case 'C1DisplayName':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC1DisplayNameIn, model.buildForm, value));
			case 'C1Model':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC1ModelIn, model.buildForm, value));
			case 'C1Icon':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC1IconIn, model.buildForm, value));
			case 'C3Name':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC3NameIn, model.buildForm, value));
			case 'C3DisplayName':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC3DisplayNameIn, model.buildForm, value));
			case 'C3Model':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC3ModelIn, model.buildForm, value));
			case 'C3Icon':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC3IconIn, model.buildForm, value));
			case 'C5Name':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC5NameIn, model.buildForm, value));
			case 'C5DisplayName':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC5DisplayNameIn, model.buildForm, value));
			case 'C5Model':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC5ModelIn, model.buildForm, value));
			case 'C5Icon':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC5IconIn, model.buildForm, value));
			case 'C7Name':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC7NameIn, model.buildForm, value));
			case 'C7DisplayName':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC7DisplayNameIn, model.buildForm, value));
			case 'C7Model':
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC7ModelIn, model.buildForm, value));
			default:
				return A2(
					_user$project$Model_ModelForm$asBuildFormIn,
					model,
					A2(_user$project$Model_ModelForm$asC7IconIn, model.buildForm, value));
		}
	});

var _user$project$Routing$matchers = _evancz$url_parser$UrlParser$oneOf(
	{
		ctor: '::',
		_0: A2(_evancz$url_parser$UrlParser$map, _user$project$Model_ModelRouting$IndexRoute, _evancz$url_parser$UrlParser$top),
		_1: {
			ctor: '::',
			_0: A2(
				_evancz$url_parser$UrlParser$map,
				_user$project$Model_ModelRouting$OverviewRoute,
				_evancz$url_parser$UrlParser$s('overview')),
			_1: {
				ctor: '::',
				_0: A2(
					_evancz$url_parser$UrlParser$map,
					_user$project$Model_ModelRouting$BuildRoute,
					_evancz$url_parser$UrlParser$s('build')),
				_1: {
					ctor: '::',
					_0: A2(
						_evancz$url_parser$UrlParser$map,
						_user$project$Model_ModelRouting$DevelopmentRoute,
						_evancz$url_parser$UrlParser$s('development')),
					_1: {
						ctor: '::',
						_0: A2(
							_evancz$url_parser$UrlParser$map,
							_user$project$Model_ModelRouting$ConfigRoute,
							_evancz$url_parser$UrlParser$s('config')),
						_1: {
							ctor: '::',
							_0: A2(
								_evancz$url_parser$UrlParser$map,
								_user$project$Model_ModelRouting$WebsiteRoute,
								A2(
									_evancz$url_parser$UrlParser_ops['</>'],
									_evancz$url_parser$UrlParser$s('websites'),
									_evancz$url_parser$UrlParser$string)),
							_1: {
								ctor: '::',
								_0: A2(
									_evancz$url_parser$UrlParser$map,
									_user$project$Model_ModelRouting$WebsiteNestedRoute,
									A2(
										_evancz$url_parser$UrlParser_ops['</>'],
										_evancz$url_parser$UrlParser$s('websites'),
										A2(
											_evancz$url_parser$UrlParser_ops['</>'],
											_evancz$url_parser$UrlParser$string,
											A2(_evancz$url_parser$UrlParser_ops['</>'], _evancz$url_parser$UrlParser$string, _evancz$url_parser$UrlParser$string)))),
								_1: {
									ctor: '::',
									_0: A2(
										_evancz$url_parser$UrlParser$map,
										_user$project$Model_ModelRouting$WebsiteNestedRouteShowEdit,
										A2(
											_evancz$url_parser$UrlParser_ops['</>'],
											_evancz$url_parser$UrlParser$s('websites'),
											A2(
												_evancz$url_parser$UrlParser_ops['</>'],
												_evancz$url_parser$UrlParser$string,
												A2(
													_evancz$url_parser$UrlParser_ops['</>'],
													_evancz$url_parser$UrlParser$string,
													A2(_evancz$url_parser$UrlParser_ops['</>'], _evancz$url_parser$UrlParser$string, _evancz$url_parser$UrlParser$string))))),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$Routing$parseLocation = function (location) {
	var _p0 = A2(_evancz$url_parser$UrlParser$parseHash, _user$project$Routing$matchers, location);
	if (_p0.ctor === 'Just') {
		return _p0._0;
	} else {
		return _user$project$Model_ModelRouting$NotFoundRoute;
	}
};

var _user$project$Update$update = F2(
	function (msg, model) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'FailResponse':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							error: _elm_lang$core$Basics$toString(_p0._0)
						}),
					{ctor: '[]'});
			case 'NewSessionSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'FetchConsoleItemSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{consoleItemList: _p0._0.messages}),
					{ctor: '[]'});
			case 'FetchServerStatusSuccess':
				var _p2 = _p0._0;
				var _p1 = _p2.status_type;
				switch (_p1) {
					case 'development':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									developmentServerStatusList: _p2.serverStatusList,
									consoleItemList: {ctor: '::', _0: _p2.message, _1: model.consoleItemList}
								}),
							{ctor: '[]'});
					case 'production':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									productionServerStatusList: _p2.serverStatusList,
									consoleItemList: {ctor: '::', _0: _p2.message, _1: model.consoleItemList}
								}),
							{ctor: '[]'});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'});
				}
			case 'OnChangeServer':
				var _p6 = _p0._0;
				var _p5 = _p0._1;
				var _p4 = _p0._2;
				var _p3 = _p6;
				switch (_p3.ctor) {
					case 'StartServer':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: A3(
									_user$project$Command$sendInitialMessage,
									_user$project$Helper_UpdateHelper$convertServerAction(_p6),
									'Initial',
									_user$project$Model_ModelMisc$Begin),
								_1: {
									ctor: '::',
									_0: A3(_user$project$Command$command, 'start_single', _p5, _p4),
									_1: {ctor: '[]'}
								}
							});
					case 'RestartServer':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: A3(
									_user$project$Command$sendInitialMessage,
									_user$project$Helper_UpdateHelper$convertServerAction(_p6),
									'Initial',
									_user$project$Model_ModelMisc$Begin),
								_1: {
									ctor: '::',
									_0: A3(_user$project$Command$command, 'restart_single', _p5, _p4),
									_1: {ctor: '[]'}
								}
							});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: A3(
									_user$project$Command$sendInitialMessage,
									_user$project$Helper_UpdateHelper$convertServerAction(_p6),
									'Initial',
									_user$project$Model_ModelMisc$Begin),
								_1: {
									ctor: '::',
									_0: A3(_user$project$Command$command, 'stop_single', _p5, _p4),
									_1: {ctor: '[]'}
								}
							});
				}
			case 'ChangeServerSuccess':
				var _p8 = _p0._0;
				var _p7 = _p8.status_type;
				switch (_p7) {
					case 'development':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									developmentServerStatusList: _p8.serverStatusList,
									consoleItemList: {ctor: '::', _0: _p8.message, _1: model.consoleItemList}
								}),
							{
								ctor: '::',
								_0: _user$project$Command$fetchServerStatus('development'),
								_1: {ctor: '[]'}
							});
					case 'production':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									productionServerStatusList: _p8.serverStatusList,
									consoleItemList: {ctor: '::', _0: _p8.message, _1: model.consoleItemList}
								}),
							{
								ctor: '::',
								_0: _user$project$Command$fetchServerStatus('production'),
								_1: {ctor: '[]'}
							});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'});
				}
			case 'FetchWebsitesIndexSuccess':
				var _p9 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							websitesItemList: _p9.websites,
							consoleItemList: {ctor: '::', _0: _p9.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'OnCommand':
				var _p11 = _p0._0;
				var _p10 = _p0._1;
				if (_p10.ctor === 'Just') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								currentTasks: A2(
									_user$project$Helper_UpdateHelper$maybePrepend,
									_user$project$Helper_UpdateHelper$currentTaskGenerator(_p11.name),
									model.currentTasks)
							}),
						{
							ctor: '::',
							_0: A3(_user$project$Command$sendInitialMessage, _p11.script, 'Initial', _user$project$Model_ModelMisc$Begin),
							_1: {
								ctor: '::',
								_0: A3(
									_user$project$Command$command,
									_p11.script,
									_user$project$Helper_UpdateHelper$convertCommandType(_p10._0),
									function (_) {
										return _.acronym;
									}(model.developmentDropdownSelection)),
								_1: {ctor: '[]'}
							}
						});
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'});
				}
			case 'CommandSuccess':
				var _p16 = _p0._0;
				var _p12 = model.currentTasks;
				if (_p12.ctor === 'Just') {
					var _p14 = _p12._0;
					var _p13 = _p16.command;
					switch (_p13) {
						case 'start_single_development':
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										consoleItemList: {ctor: '::', _0: _p16, _1: model.consoleItemList},
										currentTasks: _elm_lang$core$Maybe$Just(
											A2(
												_elm_lang$core$List$filter,
												function (x) {
													return !_elm_lang$core$Native_Utils.eq(x.name, _p16.command);
												},
												_p14))
									}),
								{
									ctor: '::',
									_0: _user$project$Command$fetchServerStatus('development'),
									_1: {ctor: '[]'}
								});
						case 'start_single_production':
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										consoleItemList: {ctor: '::', _0: _p16, _1: model.consoleItemList},
										currentTasks: _elm_lang$core$Maybe$Just(
											A2(
												_elm_lang$core$List$filter,
												function (x) {
													return !_elm_lang$core$Native_Utils.eq(x.name, _p16.command);
												},
												_p14))
									}),
								{
									ctor: '::',
									_0: _user$project$Command$fetchServerStatus('production'),
									_1: {ctor: '[]'}
								});
						default:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										consoleItemList: {ctor: '::', _0: _p16, _1: model.consoleItemList},
										currentTasks: _elm_lang$core$Maybe$Just(
											A2(
												_elm_lang$core$List$filter,
												function (x) {
													return !_elm_lang$core$Native_Utils.eq(x.name, _p16.command);
												},
												_p14))
									}),
								{ctor: '[]'});
					}
				} else {
					var _p15 = _p16.command;
					switch (_p15) {
						case 'start_single_development':
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										consoleItemList: {ctor: '::', _0: _p16, _1: model.consoleItemList}
									}),
								{
									ctor: '::',
									_0: _user$project$Command$fetchServerStatus('development'),
									_1: {ctor: '[]'}
								});
						case 'start_single_production':
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										consoleItemList: {ctor: '::', _0: _p16, _1: model.consoleItemList}
									}),
								{
									ctor: '::',
									_0: _user$project$Command$fetchServerStatus('production'),
									_1: {ctor: '[]'}
								});
						default:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										consoleItemList: {ctor: '::', _0: _p16, _1: model.consoleItemList}
									}),
								{ctor: '[]'});
					}
				}
			case 'FetchGoogleAnalyticsData':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$fetchGoogleAnalyticsData,
						_1: {ctor: '[]'}
					});
			case 'FetchGoogleAnalyticsDataSuccess':
				var _p17 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							googleAnalyticsData: _p17.googleAnalytics,
							consoleItemList: {ctor: '::', _0: _p17.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'FetchDomainExpirationData':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$fetchDomainExpirationData,
						_1: {ctor: '[]'}
					});
			case 'FetchDomainExpirationDataSuccess':
				var _p18 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							domainExpirationData: _p18.domainExpirations,
							consoleItemList: {ctor: '::', _0: _p18.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'OnRenewDomain':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$renewDomain(_p0._0),
						_1: {ctor: '[]'}
					});
			case 'RenewDomainSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'DevelopmentDropdownChange':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							configDropdownSelection: A2(
								_elm_lang$core$Maybe$withDefault,
								_user$project$Helper_DataDropdownHelper$acDropdown,
								A2(_elm_lang$core$Dict$get, _p0._0, _user$project$Helper_DataDropdownHelper$acronymToDropdownDictionary))
						}),
					{ctor: '[]'});
			case 'OnCheckDomain':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$checkDomain(_p0._0),
						_1: {ctor: '[]'}
					});
			case 'CheckDomainSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'OnRegisterDomain':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$registerDomain(_p0._0),
						_1: {ctor: '[]'}
					});
			case 'RegisterDomainSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'OnAccountSetup':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$accountSetup(_p0._0),
						_1: {ctor: '[]'}
					});
			case 'AccountSetupSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'OnServerSetup':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$serverSetup(_p0._0),
						_1: {ctor: '[]'}
					});
			case 'ServerSetupSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'OnNewWebsite':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$newWebsite(_p0._0),
						_1: {ctor: '[]'}
					});
			case 'NewWebsiteSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'OnBlurCheckProductFormValidation':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm)
						}),
					{ctor: '[]'});
			case 'OnBlurCheckPostFormValidation':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm)
						}),
					{ctor: '[]'});
			case 'OnBlurCheckUpdateFormValidation':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm)
						}),
					{ctor: '[]'});
			case 'OnBlurCheckTagFormValidation':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm)
						}),
					{ctor: '[]'});
			case 'OnBlurCheckSocialFormValidation':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm)
						}),
					{ctor: '[]'});
			case 'OnBlurCheckBuildFormValidation':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							buildFormValidation: A2(_user$project$Helper_ValidationHelper$buildFormValidationUpdate, model, model.buildForm)
						}),
					{ctor: '[]'});
			case 'MultiSelectChanged':
				var _p19 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							multiSelectTagIdSelected: _p19,
							productForm: A2(_user$project$Helper_UpdateHelper$updateProductFormProductTags, _p19, model.productForm)
						}),
					{ctor: '[]'});
			case 'FetchWebsitesIndividualSuccess':
				var _p20 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							productForm: A2(_user$project$Helper_UpdateHelper$updateCategoryIdFromCategoriesList, model.productForm, _p20.categories),
							productAssocList: _p20.productsAssoc,
							categoryList: _p20.categories,
							tagAssocList: _p20.tagsAssoc,
							multiSelectTagIdList: _user$project$Helper_UpdateHelper$createMultiSelectList(_p20.tagsAssoc),
							postList: _p20.posts,
							productsPendingList: _p20.productsDraft,
							socialList: _p20.social,
							updateList: _p20.updates,
							consoleItemList: {ctor: '::', _0: _p20.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'PopulateIndividual':
				var _p21 = _p0._0;
				switch (_p21.ctor) {
					case 'ProductDataViewType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{individualProduct: _p21._0}),
							{ctor: '[]'});
					case 'PostDataViewType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{individualPost: _p21._0}),
							{ctor: '[]'});
					case 'TagDataViewType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{individualTag: _p21._0}),
							{ctor: '[]'});
					case 'UpdateDataViewType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{individualUpdate: _p21._0}),
							{ctor: '[]'});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{individualSocial: _p21._0}),
							{ctor: '[]'});
				}
			case 'PopulateForm':
				var _p22 = _p0._0;
				switch (_p22.ctor) {
					case 'ProductDataFormType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{productForm: _p22._0}),
							{ctor: '[]'});
					case 'PostDataFormType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{postForm: _p22._0}),
							{ctor: '[]'});
					case 'TagDataFormType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{tagForm: _p22._0}),
							{ctor: '[]'});
					case 'UpdateDataFormType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{updateForm: _p22._0}),
							{ctor: '[]'});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{socialForm: _p22._0}),
							{ctor: '[]'});
				}
			case 'SetProductsField':
				var _p25 = _p0._1;
				var _p24 = _p0._0;
				var _p23 = _p24;
				switch (_p23.ctor) {
					case 'ProductFormLikeTotal':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							A3(
								_user$project$Model_ModelForm$setProductsIntField,
								model,
								_p24,
								_elm_lang$core$String$toInt(_p25)),
							{ctor: '[]'});
					case 'ProductFormPrice':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							A3(
								_user$project$Model_ModelForm$setProductsFloatField,
								model,
								_p24,
								_elm_lang$core$String$toFloat(_p25)),
							{ctor: '[]'});
					case 'ProductFormCategory':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							A3(_user$project$Model_ModelForm$setProductsCategoryIdField, model, _p24, _p25),
							{ctor: '[]'});
					case 'ProductFormTag':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{productTagId: _p25}),
							{ctor: '[]'});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							A3(_user$project$Model_ModelForm$setProductsStringField, model, _p24, _p25),
							{ctor: '[]'});
				}
			case 'SetProductsCheckbox':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setProductsBoolField, model, _user$project$Model_ModelFormType$ProductFormDraft, true),
					{ctor: '[]'});
			case 'ItemCreate':
				var _p37 = _p0._0;
				var _p26 = _p37;
				switch (_p26.ctor) {
					case 'ProductDataFormType':
						var _p28 = _p26._0;
						var _p27 = _user$project$Helper_ValidationHelper$productFormValidationCheck(model.productFormValidation);
						if (_p27 === true) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, _p28)
									}),
								{ctor: '[]'});
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, _p28),
										productForm: _user$project$Helper_DataEmptyHelper$emptyProductForm
									}),
								{
									ctor: '::',
									_0: A2(_user$project$Command$itemCreate, _p37, model.routeAcronym),
									_1: {ctor: '[]'}
								});
						}
					case 'PostDataFormType':
						var _p30 = _p26._0;
						var _p29 = _user$project$Helper_ValidationHelper$postFormValidationCheck(model.postFormValidation);
						if (_p29 === true) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, _p30)
									}),
								{ctor: '[]'});
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, _p30),
										postForm: _user$project$Helper_DataEmptyHelper$emptyPostForm
									}),
								{
									ctor: '::',
									_0: A2(_user$project$Command$itemCreate, _p37, model.routeAcronym),
									_1: {ctor: '[]'}
								});
						}
					case 'TagDataFormType':
						var _p32 = _p26._0;
						var _p31 = _user$project$Helper_ValidationHelper$tagFormValidationCheck(model.tagFormValidation);
						if (_p31 === true) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, _p32)
									}),
								{ctor: '[]'});
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, _p32),
										tagForm: _user$project$Helper_DataEmptyHelper$emptyTagForm
									}),
								{
									ctor: '::',
									_0: A2(_user$project$Command$itemCreate, _p37, model.routeAcronym),
									_1: {ctor: '[]'}
								});
						}
					case 'UpdateDataFormType':
						var _p34 = _p26._0;
						var _p33 = _user$project$Helper_ValidationHelper$updateFormValidationCheck(model.updateFormValidation);
						if (_p33 === true) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, _p34)
									}),
								{ctor: '[]'});
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, _p34),
										updateForm: _user$project$Helper_DataEmptyHelper$emptyUpdateForm
									}),
								{
									ctor: '::',
									_0: A2(_user$project$Command$itemCreate, _p37, model.routeAcronym),
									_1: {ctor: '[]'}
								});
						}
					default:
						var _p36 = _p26._0;
						var _p35 = _user$project$Helper_ValidationHelper$socialFormValidationCheck(model.socialFormValidation);
						if (_p35 === true) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, _p36)
									}),
								{ctor: '[]'});
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, _p36),
										socialForm: _user$project$Helper_DataEmptyHelper$emptySocialForm
									}),
								{
									ctor: '::',
									_0: A2(_user$project$Command$itemCreate, _p37, model.routeAcronym),
									_1: {ctor: '[]'}
								});
						}
				}
			case 'ItemCreateSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{
						ctor: '::',
						_0: _user$project$Command$fetchWebsiteIndividual(model.routeAcronym),
						_1: {ctor: '[]'}
					});
			case 'ItemUpdate':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: A3(_user$project$Command$itemUpdate, _p0._0, model.routeAcronym, _p0._1),
						_1: {ctor: '[]'}
					});
			case 'ItemUpdateSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{
						ctor: '::',
						_0: _user$project$Command$fetchWebsiteIndividual(model.routeAcronym),
						_1: {ctor: '[]'}
					});
			case 'ItemDelete':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: A3(_user$project$Command$itemDelete, _p0._0, model.routeAcronym, _p0._1),
						_1: {ctor: '[]'}
					});
			case 'ItemDeleteSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{
						ctor: '::',
						_0: _user$project$Command$fetchWebsiteIndividual(model.routeAcronym),
						_1: {ctor: '[]'}
					});
			case 'SetPostsField':
				var _p40 = _p0._1;
				var _p39 = _p0._0;
				var _p38 = _p39;
				switch (_p38.ctor) {
					case 'PostFormProductLimit':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							A3(
								_user$project$Model_ModelForm$setPostsIntField,
								model,
								_p39,
								_user$project$Helper_UpdateHelper$stringToInt(_p40)),
							{ctor: '[]'});
					case 'PostFormProductOffset':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							A3(
								_user$project$Model_ModelForm$setPostsIntField,
								model,
								_p39,
								_user$project$Helper_UpdateHelper$stringToInt(_p40)),
							{ctor: '[]'});
					case 'PostFormTag':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{postTagId: _p40}),
							{ctor: '[]'});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							A3(_user$project$Model_ModelForm$setPostsStringField, model, _p39, _p40),
							{ctor: '[]'});
				}
			case 'OnProductFinderInput':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{productFinderInput: _p0._0}),
					{ctor: '[]'});
			case 'PrefilNewProduct':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$prefilNewProduct(model.productFinderInput),
						_1: {ctor: '[]'}
					});
			case 'PrefilNewProductSuccess':
				var _p41 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							productForm: _user$project$Helper_UpdateHelper$updateProductForm(_p41.product),
							consoleItemList: {ctor: '::', _0: _p41.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'PrefilSocialMediaForm':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: A2(_user$project$Command$prefilSocialMediaForm, _p0._0, model.routeAcronym),
						_1: {ctor: '[]'}
					});
			case 'PrefilSocialMediaFormSuccess':
				var _p42 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							socialForm: _p42.prefil,
							consoleItemList: {ctor: '::', _0: _p42.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'SetBuildForm':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setBuildField, model, _p0._0, _p0._1),
					{ctor: '[]'});
			case 'SetSocialField':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setSocialStringField, model, _p0._0, _p0._1),
					{ctor: '[]'});
			case 'SetSocialCheckbox':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setSocialBoolField, model, _user$project$Model_ModelFormType$SocialFormDraft, true),
					{ctor: '[]'});
			case 'SetTagsField':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setTagsField, model, _p0._0, _p0._1),
					{ctor: '[]'});
			case 'SetUpdatesField':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setUpdatesField, model, _p0._0, _p0._1),
					{ctor: '[]'});
			case 'ToDatePicker':
				var _p43 = A3(_elm_community$elm_datepicker$DatePicker$update, _elm_community$elm_datepicker$DatePicker$defaultSettings, _p0._0, model.datePicker);
				var newDatePicker = _p43._0;
				var datePickerFx = _p43._1;
				var mDate = _p43._2;
				var date = function () {
					var _p44 = mDate;
					if (_p44.ctor === 'Changed') {
						return _p44._0;
					} else {
						return model.date;
					}
				}();
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							date: date,
							datePicker: newDatePicker,
							productForm: A2(_user$project$Helper_UpdateHelper$setInitialProductFormScheduleDateMaybe, date, model.productForm),
							updateForm: A2(_user$project$Helper_UpdateHelper$setInitialUpdateFormScheduleDateMaybe, date, model.updateForm),
							socialForm: A2(_user$project$Helper_UpdateHelper$setInitialSocialFormScheduleDateMaybe, date, model.socialForm)
						}),
					{
						ctor: '::',
						_0: A2(_elm_lang$core$Platform_Cmd$map, _user$project$Msg$ToDatePicker, datePickerFx),
						_1: {ctor: '[]'}
					});
			case 'InitialDatePickerDate':
				var _p45 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							datePicker: _elm_community$elm_datepicker$DatePicker$initFromDate(_p45),
							date: _elm_lang$core$Maybe$Just(_p45),
							productForm: A2(_user$project$Helper_UpdateHelper$setInitialProductFormScheduleDate, _p45, model.productForm),
							updateForm: A2(_user$project$Helper_UpdateHelper$setInitialUpdateFormScheduleDate, _p45, model.updateForm),
							socialForm: A2(_user$project$Helper_UpdateHelper$setInitialSocialFormScheduleDate, _p45, model.socialForm)
						}),
					{ctor: '[]'});
			case 'FetchCommonEnv':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _user$project$Command$fetchCommonEnv,
						_1: {ctor: '[]'}
					});
			case 'FetchCommonEnvSuccess':
				var _p46 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							commonEnvData: _p46.commonEnvData,
							consoleItemList: {ctor: '::', _0: _p46.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'FetchConfig':
				var _p47 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							configDropdownSelection: A2(
								_elm_lang$core$Maybe$withDefault,
								_user$project$Helper_DataDropdownHelper$acDropdown,
								A2(_elm_lang$core$Dict$get, _p47, _user$project$Helper_DataDropdownHelper$acronymToDropdownDictionary))
						}),
					{
						ctor: '::',
						_0: _user$project$Command$fetchConfig(_p47),
						_1: {ctor: '[]'}
					});
			case 'FetchConfigSuccess':
				var _p48 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							configEnvData: _p48.config,
							consoleItemList: {ctor: '::', _0: _p48.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'FetchIndividualEnv':
				var _p49 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							individualEnvDropdownSelection: A2(
								_elm_lang$core$Maybe$withDefault,
								_user$project$Helper_DataDropdownHelper$acDropdown,
								A2(_elm_lang$core$Dict$get, _p49, _user$project$Helper_DataDropdownHelper$acronymToDropdownDictionary))
						}),
					{
						ctor: '::',
						_0: _user$project$Command$fetchIndividualEnv(_p49),
						_1: {ctor: '[]'}
					});
			case 'FetchIndividualEnvSuccess':
				var _p50 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							individualEnvData: _p50.individualEnvData,
							consoleItemList: {ctor: '::', _0: _p50.message, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'SetCommonEnvField':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setCommonEnvField, model, _p0._0, _p0._1),
					{ctor: '[]'});
			case 'SetIndividualEnvField':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setIndividualEnvField, model, _p0._0, _p0._1),
					{ctor: '[]'});
			case 'UpdateEnv':
				var _p51 = _p0._0;
				switch (_p51.ctor) {
					case 'CommonEnvDataFormType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: _user$project$Command$updateCommonEnv(model.commonEnvData),
								_1: {ctor: '[]'}
							});
					case 'IndividualEnvDataFormType':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: A2(_user$project$Command$updateIndividualEnv, model.individualEnvData, model.individualEnvDropdownSelection),
								_1: {ctor: '[]'}
							});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: A2(_user$project$Command$updateConfig, model.configEnvData, model.configDropdownSelection),
								_1: {ctor: '[]'}
							});
				}
			case 'UpdateEnvSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'SetConfigFormField':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A3(_user$project$Model_ModelForm$setConfigField, model, _p0._0, _p0._1),
					{ctor: '[]'});
			case 'KeyDown':
				var _p55 = _p0._0;
				var third = A2(
					_elm_lang$core$Maybe$withDefault,
					0,
					_elm_lang$core$List$head(
						A2(_elm_lang$core$List$drop, 2, model.keysDown)));
				var second = A2(
					_elm_lang$core$Maybe$withDefault,
					0,
					_elm_lang$core$List$head(
						A2(_elm_lang$core$List$drop, 1, model.keysDown)));
				var first = A2(
					_elm_lang$core$Maybe$withDefault,
					0,
					_elm_lang$core$List$head(model.keysDown));
				var _p52 = model.keyboardAvailable;
				if (_p52 === true) {
					var _p53 = _p55;
					switch (_p53) {
						case 192:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{keyboardAvailable: false}),
								{
									ctor: '::',
									_0: A3(_user$project$Command$sendInitialMessage, 'Disable Keyboard', 'Disable Keyboard', _user$project$Model_ModelMisc$Toggle),
									_1: {ctor: '[]'}
								});
						case 49:
							return A4(_user$project$Helper_KeyboardHelper$keyDownChangeDropdown, model, first, second, third);
						case 50:
							return A5(
								_user$project$Helper_KeyboardHelper$keyDownDevelopmentCommand,
								model,
								first,
								second,
								_elm_lang$core$Maybe$Just(_user$project$Model_ModelDevelopment$Development),
								model.developmentDropdownSelection);
						case 51:
							return A5(
								_user$project$Helper_KeyboardHelper$keyDownDevelopmentCommand,
								model,
								first,
								second,
								_elm_lang$core$Maybe$Just(_user$project$Model_ModelDevelopment$Production),
								model.developmentDropdownSelection);
						case 52:
							return A4(_user$project$Helper_KeyboardHelper$keyDownChangeUX, model, first, second, model.developmentDropdownSelection);
						case 57:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{showKeyboardHelper: true}),
								{ctor: '[]'});
						case 27:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										keysDown: {ctor: '[]'}
									}),
								{
									ctor: '::',
									_0: A3(_user$project$Command$sendInitialMessage, 'Clear Keyboard', 'Console Update', _user$project$Model_ModelMisc$Toggle),
									_1: {ctor: '[]'}
								});
						case 8:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										keysDown: _user$project$Helper_UpdateHelper$deleteLastItemFromList(model.keysDown)
									}),
								{ctor: '[]'});
						case 186:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										keysDown: {ctor: '[]'}
									}),
								{
									ctor: '::',
									_0: A3(_user$project$Command$sendInitialMessage, 'Clear Keyboard', 'Console Update', _user$project$Model_ModelMisc$Toggle),
									_1: {ctor: '[]'}
								});
						case 48:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										keysDown: {ctor: '[]'},
										productForm: _user$project$Helper_DataEmptyHelper$emptyProductForm,
										postForm: _user$project$Helper_DataEmptyHelper$emptyPostForm,
										socialForm: _user$project$Helper_DataEmptyHelper$emptySocialForm,
										tagForm: _user$project$Helper_DataEmptyHelper$emptyTagForm,
										updateForm: _user$project$Helper_DataEmptyHelper$emptyUpdateForm
									}),
								{
									ctor: '::',
									_0: _user$project$Command$fetchServerStatus('production'),
									_1: {
										ctor: '::',
										_0: _user$project$Command$fetchServerStatus('development'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$core$Random$generate,
												_user$project$Msg$RandomCtaNumber,
												A2(_elm_lang$core$Random$int, 1, 11)),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$core$Random$generate,
													_user$project$Msg$RandomProductLikeNumber,
													A2(_elm_lang$core$Random$int, 214, 789)),
												_1: {
													ctor: '::',
													_0: A3(_user$project$Command$sendInitialMessage, 'Reset Form Data', 'Toggle', _user$project$Model_ModelMisc$Toggle),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								});
						case 220:
							return A4(_user$project$Helper_KeyboardHelper$keyDownSubmitData, model, first, second, model.developmentDropdownSelection);
						default:
							return (_elm_lang$core$Native_Utils.cmp(
								_elm_lang$core$List$length(model.keysDown),
								4) < 0) ? A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_elm_lang$core$Native_Utils.update(
									model,
									{
										keysDown: A2(
											_elm_lang$core$Basics_ops['++'],
											model.keysDown,
											{
												ctor: '::',
												_0: _p55,
												_1: {ctor: '[]'}
											})
									}),
								{ctor: '[]'}) : A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'});
					}
				} else {
					var _p54 = _p55;
					if (_p54 === 192) {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{keyboardAvailable: true}),
							{
								ctor: '::',
								_0: A3(_user$project$Command$sendInitialMessage, 'Enable Keyboard', 'Enable Keyboard', _user$project$Model_ModelMisc$Toggle),
								_1: {ctor: '[]'}
							});
					} else {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'});
					}
				}
			case 'RandomCtaNumber':
				var _p56 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							randomCtaNumber: _p56,
							productForm: A3(_user$project$Helper_GeneratorHelper$ctaProductFormGenerator, model, model.productForm, _p56)
						}),
					{ctor: '[]'});
			case 'RandomProductLikeNumber':
				var _p57 = _p0._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							randomProductLikeNumber: _p57,
							productForm: A3(_user$project$Helper_GeneratorHelper$productLikeProductFormGenerator, model, model.productForm, _p57)
						}),
					{ctor: '[]'});
			case 'KeyUp':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{showKeyboardHelper: false}),
					{ctor: '[]'});
			case 'SendInitialMessage':
				var _p58 = model.currentTasks;
				if (_p58.ctor === 'Just') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: A3(_user$project$Command$sendInitialMessage, _p0._0, _p0._1, _p0._2),
							_1: {ctor: '[]'}
						});
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'});
				}
			case 'SendInitialMessageSuccess':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							consoleItemList: {ctor: '::', _0: _p0._0, _1: model.consoleItemList}
						}),
					{ctor: '[]'});
			case 'Tick':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: A2(_elm_lang$core$Task$perform, _user$project$Msg$NewDate, _elm_lang$core$Date$now),
						_1: {
							ctor: '::',
							_0: A2(_elm_lang$core$Task$perform, _user$project$Msg$NewTime, _elm_lang$core$Time$now),
							_1: {ctor: '[]'}
						}
					});
			case 'NewDate':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							currentDate: _elm_lang$core$Maybe$Just(_p0._0)
						}),
					{ctor: '[]'});
			case 'NewTime':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							currentTime: _elm_lang$core$Maybe$Just(_p0._0)
						}),
					{ctor: '[]'});
			case 'UpdateCurrentTaskDuration':
				var _p59 = model.currentTasks;
				if (_p59.ctor === 'Just') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								currentTasks: _elm_lang$core$Maybe$Just(
									A2(_elm_lang$core$List$map, _user$project$Helper_UpdateHelper$incrementDuration, _p59._0))
							}),
						{ctor: '[]'});
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'});
				}
			default:
				var _p75 = _p0._0;
				var websiteAcronym = A2(
					_elm_lang$core$Maybe$withDefault,
					'ac',
					_elm_lang$core$List$head(
						A2(
							_elm_lang$core$List$drop,
							1,
							A2(_elm_lang$core$String$split, '/', _p75.hash))));
				var newRoute = _user$project$Routing$parseLocation(_p75);
				var _p60 = newRoute;
				switch (_p60.ctor) {
					case 'WebsiteRoute':
						var _p61 = _p60._0;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{route: newRoute, routeAcronym: _p61}),
							{
								ctor: '::',
								_0: A3(
									_user$project$Command$sendInitialMessage,
									A2(_elm_lang$core$Basics_ops['++'], 'URL To ', _p61),
									'URL Change',
									_user$project$Model_ModelMisc$Toggle),
								_1: {
									ctor: '::',
									_0: _user$project$Command$fetchWebsiteIndividual(_p61),
									_1: {ctor: '[]'}
								}
							});
					case 'WebsiteNestedRoute':
						var _p67 = _p60._1;
						var _p66 = _p60._2;
						var _p65 = _p60._0;
						var _p62 = _elm_lang$core$Native_Utils.eq(_p65, model.routeAcronym);
						if (_p62 === true) {
							var _p63 = _p67;
							switch (_p63) {
								case 'tags':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p65)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								case 'products':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p65)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								case 'social':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p65)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								case 'updates':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p65)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								case 'posts':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p65)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								default:
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{route: newRoute, routeAcronym: _p65, routeType: _p67, routeAction: _p66}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p65)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
							}
						} else {
							var _p64 = _p67;
							switch (_p64) {
								case 'tags':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p65),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p65)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {ctor: '[]'}
											}
										});
								case 'products':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p65),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p65)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {ctor: '[]'}
											}
										});
								case 'social':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p65),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p65)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {ctor: '[]'}
											}
										});
								case 'updates':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p65),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p65)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {ctor: '[]'}
											}
										});
								case 'posts':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm),
												route: newRoute,
												routeAcronym: _p65,
												routeType: _p67,
												routeAction: _p66
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p65),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p65)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {ctor: '[]'}
											}
										});
								default:
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{route: newRoute, routeAcronym: _p65, routeType: _p67, routeAction: _p66}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p65)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
							}
						}
					case 'WebsiteNestedRouteShowEdit':
						var _p74 = _p60._1;
						var _p73 = _p60._2;
						var _p72 = _p60._0;
						var _p71 = _p60._3;
						var _p68 = _elm_lang$core$Native_Utils.eq(_p72, model.routeAcronym);
						if (_p68 === true) {
							var _p69 = _p74;
							switch (_p69) {
								case 'tags':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm),
												tagForm: A2(_user$project$Helper_UpdateHelper$retrieveTagFromId, model.tagAssocList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p72)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								case 'products':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm),
												productForm: A2(_user$project$Helper_UpdateHelper$retrieveProductAssocFromId, model.productAssocList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p72)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								case 'social':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm),
												socialForm: A2(_user$project$Helper_UpdateHelper$retrieveSocialFromId, model.socialList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p72)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								case 'updates':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm),
												updateForm: A2(_user$project$Helper_UpdateHelper$retrieveUpdateFromId, model.updateList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p72)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								case 'posts':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm),
												postForm: A2(_user$project$Helper_UpdateHelper$retrievePostFromId, model.postList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p72)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
								default:
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{route: newRoute, routeAcronym: _p72, routeType: _p74, routeAction: _p73}),
										{
											ctor: '::',
											_0: A3(
												_user$project$Command$sendInitialMessage,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'URL To ',
													_elm_lang$core$String$toUpper(_p72)),
												'URL Change',
												_user$project$Model_ModelMisc$Toggle),
											_1: {ctor: '[]'}
										});
							}
						} else {
							var _p70 = _p74;
							switch (_p70) {
								case 'tags':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												tagFormValidation: A2(_user$project$Helper_ValidationHelper$tagFormValidationUpdate, model, model.tagForm),
												tagForm: A2(_user$project$Helper_UpdateHelper$retrieveTagFromId, model.tagAssocList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p72),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p72)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {
													ctor: '::',
													_0: A3(
														_user$project$Command$sendInitialMessage,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'Fetch Website Individual - ',
															_elm_lang$core$String$toUpper(_p72)),
														'URL Change',
														_user$project$Model_ModelMisc$Load),
													_1: {ctor: '[]'}
												}
											}
										});
								case 'products':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												productFormValidation: A2(_user$project$Helper_ValidationHelper$productFormValidationUpdate, model, model.productForm),
												productForm: A2(_user$project$Helper_UpdateHelper$retrieveProductAssocFromId, model.productAssocList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p72),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p72)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {
													ctor: '::',
													_0: A3(
														_user$project$Command$sendInitialMessage,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'Fetch Website Individual - ',
															_elm_lang$core$String$toUpper(_p72)),
														'URL Change',
														_user$project$Model_ModelMisc$Load),
													_1: {ctor: '[]'}
												}
											}
										});
								case 'social':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												socialFormValidation: A2(_user$project$Helper_ValidationHelper$socialFormValidationUpdate, model, model.socialForm),
												socialForm: A2(_user$project$Helper_UpdateHelper$retrieveSocialFromId, model.socialList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p72),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p72)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {
													ctor: '::',
													_0: A3(
														_user$project$Command$sendInitialMessage,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'Fetch Website Individual - ',
															_elm_lang$core$String$toUpper(_p72)),
														'URL Change',
														_user$project$Model_ModelMisc$Load),
													_1: {ctor: '[]'}
												}
											}
										});
								case 'updates':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												updateFormValidation: A2(_user$project$Helper_ValidationHelper$updateFormValidationUpdate, model, model.updateForm),
												updateForm: A2(_user$project$Helper_UpdateHelper$retrieveUpdateFromId, model.updateList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p72),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p72)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {
													ctor: '::',
													_0: A3(
														_user$project$Command$sendInitialMessage,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'Fetch Website Individual - ',
															_elm_lang$core$String$toUpper(_p72)),
														'URL Change',
														_user$project$Model_ModelMisc$Load),
													_1: {ctor: '[]'}
												}
											}
										});
								case 'posts':
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{
												postFormValidation: A2(_user$project$Helper_ValidationHelper$postFormValidationUpdate, model, model.postForm),
												postForm: A2(_user$project$Helper_UpdateHelper$retrievePostFromId, model.postList, _p71),
												route: newRoute,
												routeAcronym: _p72,
												routeType: _p74,
												routeAction: _p73,
												routeId: _p71
											}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p72),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p72)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {
													ctor: '::',
													_0: A3(
														_user$project$Command$sendInitialMessage,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'Fetch Website Individual - ',
															_elm_lang$core$String$toUpper(_p72)),
														'URL Change',
														_user$project$Model_ModelMisc$Load),
													_1: {ctor: '[]'}
												}
											}
										});
								default:
									return A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_elm_lang$core$Native_Utils.update(
											model,
											{route: newRoute, routeAcronym: _p72, routeType: _p74, routeAction: _p73}),
										{
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(_p72),
											_1: {
												ctor: '::',
												_0: A3(
													_user$project$Command$sendInitialMessage,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'URL To ',
														_elm_lang$core$String$toUpper(_p72)),
													'URL Change',
													_user$project$Model_ModelMisc$Toggle),
												_1: {
													ctor: '::',
													_0: A3(
														_user$project$Command$sendInitialMessage,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'Fetch Website Individual - ',
															_elm_lang$core$String$toUpper(_p72)),
														'URL Change',
														_user$project$Model_ModelMisc$Load),
													_1: {ctor: '[]'}
												}
											}
										});
							}
						}
					case 'IndexRoute':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{route: newRoute}),
							{
								ctor: '::',
								_0: A3(_user$project$Command$sendInitialMessage, 'URL To Index', 'URL Change', _user$project$Model_ModelMisc$Toggle),
								_1: {ctor: '[]'}
							});
					case 'OverviewRoute':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{route: newRoute}),
							{
								ctor: '::',
								_0: A3(_user$project$Command$sendInitialMessage, 'URL To Overview', 'URL Change', _user$project$Model_ModelMisc$Toggle),
								_1: {ctor: '[]'}
							});
					case 'BuildRoute':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									buildFormValidation: A2(_user$project$Helper_ValidationHelper$buildFormValidationUpdate, model, model.buildForm),
									route: newRoute
								}),
							{
								ctor: '::',
								_0: A3(_user$project$Command$sendInitialMessage, 'URL To Build', 'URL Change', _user$project$Model_ModelMisc$Toggle),
								_1: {ctor: '[]'}
							});
					case 'DevelopmentRoute':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{route: newRoute}),
							{
								ctor: '::',
								_0: A3(_user$project$Command$sendInitialMessage, 'URL To Development', 'URL Change', _user$project$Model_ModelMisc$Toggle),
								_1: {ctor: '[]'}
							});
					case 'ConfigRoute':
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{route: newRoute}),
							{
								ctor: '::',
								_0: A3(_user$project$Command$sendInitialMessage, 'URL To Config', 'URL Change', _user$project$Model_ModelMisc$Toggle),
								_1: {ctor: '[]'}
							});
					default:
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{route: newRoute}),
							{
								ctor: '::',
								_0: A3(_user$project$Command$sendInitialMessage, 'Route Not Found', 'URL Change', _user$project$Model_ModelMisc$Toggle),
								_1: {ctor: '[]'}
							});
				}
		}
	});

var _user$project$MainManager$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: _elm_lang$keyboard$Keyboard$downs(_user$project$Msg$KeyDown),
			_1: {
				ctor: '::',
				_0: _elm_lang$keyboard$Keyboard$ups(_user$project$Msg$KeyUp),
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$Time$every, _elm_lang$core$Time$second, _user$project$Msg$Tick),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _user$project$MainManager$initialModel = function (route) {
	var _p0 = _elm_community$elm_datepicker$DatePicker$init;
	var datePicker = _p0._0;
	var datePickerFx = _p0._1;
	return {
		websitesItemList: {ctor: '[]'},
		navbarWebsiteItems: _user$project$Helper_DataNavbarHelper$navbarItems,
		websitesMainNavbarItems: _user$project$Helper_DataNavbarHelper$websitesMainNavbarItems,
		navbarStatus: _elm_lang$core$Maybe$Nothing,
		consoleItemList: {ctor: '[]'},
		keysDown: {ctor: '[]'},
		googleAnalyticsData: {ctor: '[]'},
		domainExpirationData: {ctor: '[]'},
		productionServerStatusList: {ctor: '[]'},
		developmentServerStatusList: {ctor: '[]'},
		commandsList: _user$project$Helper_DataNavbarHelper$commandsList,
		developmentDropdown: _user$project$Helper_DataDropdownHelper$websiteDropdownList,
		developmentDropdownSelection: _user$project$Helper_DataDropdownHelper$websiteDropdownAC,
		domainInput: '',
		buildForm: _user$project$Helper_DataEmptyHelper$emptyBuildForm,
		productFinderInput: '',
		productFinderData: _user$project$Helper_DataEmptyHelper$emptyProductAssoc,
		randomCtaNumber: 7,
		randomProductLikeNumber: 201,
		productTagId: '',
		postTagId: '',
		multiSelectTagIdList: {ctor: '[]'},
		multiSelectTagIdSelected: {ctor: '[]'},
		productFormDisplayNameCount: _elm_lang$core$Maybe$Just(35),
		productFormDescriptionCount: _elm_lang$core$Maybe$Just(90),
		productFormBlogDescriptionCount: _elm_lang$core$Maybe$Just(90),
		updateNameCount: _elm_lang$core$Maybe$Just(50),
		productForm: _user$project$Helper_DataEmptyHelper$emptyProductForm,
		postForm: _user$project$Helper_DataEmptyHelper$emptyPostForm,
		socialForm: _user$project$Helper_DataEmptyHelper$emptySocialForm,
		tagForm: _user$project$Helper_DataEmptyHelper$emptyTagForm,
		updateForm: _user$project$Helper_DataEmptyHelper$emptyUpdateForm,
		productFormValidation: _user$project$Helper_DataEmptyHelper$emptyProductFormValidation,
		postFormValidation: _user$project$Helper_DataEmptyHelper$emptyPostFormValidation,
		socialFormValidation: _user$project$Helper_DataEmptyHelper$emptySocialFormValidation,
		tagFormValidation: _user$project$Helper_DataEmptyHelper$emptyTagFormValidation,
		updateFormValidation: _user$project$Helper_DataEmptyHelper$emptyUpdateFormValidation,
		buildFormValidation: _user$project$Helper_DataEmptyHelper$emptyBuildFormValidation,
		individualProduct: _user$project$Helper_DataEmptyHelper$emptyProductAssoc,
		individualPost: _user$project$Helper_DataEmptyHelper$emptyPostAssoc,
		individualSocial: _user$project$Helper_DataEmptyHelper$emptySocial,
		individualTag: _user$project$Helper_DataEmptyHelper$emptyTagAssoc,
		individualUpdate: _user$project$Helper_DataEmptyHelper$emptyUpdate,
		productAssocList: {ctor: '[]'},
		postList: {ctor: '[]'},
		socialList: {ctor: '[]'},
		updateList: {ctor: '[]'},
		tagAssocList: {ctor: '[]'},
		categoryList: {ctor: '[]'},
		productsPendingList: {ctor: '[]'},
		productTypeDropdownList: _user$project$Helper_DataDropdownHelper$productTypeDropdownList,
		postTypeDropdownList: _user$project$Helper_DataDropdownHelper$postTypeDropdownList,
		socialMediaTypeDropdownList: _user$project$Helper_DataDropdownHelper$socialMediaTypeDropdownList,
		date: _elm_lang$core$Maybe$Nothing,
		datePicker: datePicker,
		configEnvData: _user$project$Helper_DataEmptyHelper$emptyConfigEnvData,
		configDropdown: _user$project$Helper_DataDropdownHelper$websiteDropdownList,
		configDropdownSelection: _user$project$Helper_DataDropdownHelper$websiteDropdownAC,
		commonEnvData: _user$project$Helper_DataEmptyHelper$emptyCommonEnvData,
		individualEnvData: _user$project$Helper_DataEmptyHelper$emptyIndividualEnvData,
		individualEnvDropdown: _user$project$Helper_DataDropdownHelper$websiteDropdownList,
		individualEnvDropdownSelection: _user$project$Helper_DataDropdownHelper$websiteDropdownAC,
		route: route,
		routeAcronym: 'ac',
		routeType: 'products',
		routeAction: 'new',
		routeId: '',
		showKeyboardHelper: false,
		keyboardAvailable: true,
		currentDate: _elm_lang$core$Maybe$Nothing,
		currentTime: _elm_lang$core$Maybe$Nothing,
		currentTasks: _elm_lang$core$Maybe$Nothing,
		error: ''
	};
};
var _user$project$MainManager$init = function (location) {
	var websiteAcronym = A2(
		_elm_lang$core$Maybe$withDefault,
		'ac',
		_elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$drop,
				1,
				A2(_elm_lang$core$String$split, '/', location.hash))));
	var currentRoute = _user$project$Routing$parseLocation(location);
	return A2(
		_elm_lang$core$Platform_Cmd_ops['!'],
		_user$project$MainManager$initialModel(currentRoute),
		{
			ctor: '::',
			_0: A2(
				_elm_lang$core$Random$generate,
				_user$project$Msg$RandomProductLikeNumber,
				A2(_elm_lang$core$Random$int, 214, 789)),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$core$Random$generate,
					_user$project$Msg$RandomCtaNumber,
					A2(_elm_lang$core$Random$int, 1, 11)),
				_1: {
					ctor: '::',
					_0: _user$project$Command$fetchConfig(websiteAcronym),
					_1: {
						ctor: '::',
						_0: _user$project$Command$fetchIndividualEnv(websiteAcronym),
						_1: {
							ctor: '::',
							_0: _user$project$Command$fetchCommonEnv,
							_1: {
								ctor: '::',
								_0: _user$project$Command$fetchServerStatus('development'),
								_1: {
									ctor: '::',
									_0: _user$project$Command$fetchServerStatus('production'),
									_1: {
										ctor: '::',
										_0: _user$project$Command$fetchConsoleItemList,
										_1: {
											ctor: '::',
											_0: _user$project$Command$fetchWebsiteIndividual(websiteAcronym),
											_1: {
												ctor: '::',
												_0: _user$project$Command$fetchWebsitesIndex,
												_1: {
													ctor: '::',
													_0: _user$project$Command$newConsoleSession,
													_1: {
														ctor: '::',
														_0: A2(_elm_lang$core$Task$perform, _user$project$Msg$InitialDatePickerDate, _elm_lang$core$Date$now),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _user$project$MainManager$main = A2(
	_elm_lang$navigation$Navigation$program,
	_user$project$Msg$OnLocationChange,
	{init: _user$project$MainManager$init, view: _user$project$View$view, update: _user$project$Update$update, subscriptions: _user$project$MainManager$subscriptions})();

var Elm = {};
Elm['MainManager'] = Elm['MainManager'] || {};
if (typeof _user$project$MainManager$main !== 'undefined') {
    _user$project$MainManager$main(Elm['MainManager'], 'MainManager', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

